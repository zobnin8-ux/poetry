"""
Import poems from stihi.ru/avtor/boeing75 into content/poems/*.md
Run: python scripts/import_from_stihi.py
"""
from __future__ import annotations

import re
import ssl
import time
import urllib.request
from pathlib import Path

AUTHOR = "boeing75"
BASE = "https://stihi.ru"
ROOT = Path(__file__).resolve().parents[1]
POEMS_DIR = ROOT / "content" / "poems"

GENRE_CHAPTER = {
    "любовная лирика": "svet",
    "мистика и эзотерика": "tajna",
    "городская лирика": "gorod",
    "пейзажная лирика": "gorod",
    "философская лирика": "nachalo",
}

TRANSLIT = {
    "а": "a",
    "б": "b",
    "в": "v",
    "г": "g",
    "д": "d",
    "е": "e",
    "ё": "e",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "й": "y",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "ts",
    "ч": "ch",
    "ш": "sh",
    "щ": "sch",
    "ъ": "",
    "ы": "y",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya",
}

SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60, context=SSL_CTX) as resp:
        data = resp.read()
        charset = resp.headers.get_content_charset() or "windows-1251"
    return data.decode(charset, errors="replace")


def slugify(title: str) -> str:
    s = title.lower().strip()
    out: list[str] = []
    for ch in s:
        if ch in TRANSLIT:
            out.append(TRANSLIT[ch])
        elif ch.isalnum():
            out.append(ch)
        elif ch in " -—–_":
            out.append("-")
    slug = re.sub(r"-+", "-", "".join(out)).strip("-")
    return slug or "stih"


def parse_author_list(html: str) -> list[dict]:
    items: list[dict] = []
    pattern = re.compile(
        r'<li><a href="(/20\d{2}/[^"]+)" class="poemlink">([^<]+)</a>\s*'
        r"<small>- ([^,]+),",
        re.I,
    )
    for path, title, genre in pattern.findall(html):
        items.append(
            {
                "path": path,
                "title": title.strip(),
                "genre": genre.strip().lower(),
            }
        )
    return items


def parse_poem_body(html: str) -> str:
    m = re.search(r'<div class="text">(.*?)</div>', html, re.S | re.I)
    if not m:
        return ""
    raw = re.sub(r"<br\s*/?>\s*", "\n", m.group(1), flags=re.I)
    raw = re.sub(r"&nbsp;", " ", raw)
    raw = re.sub(r"<[^>]+>", "", raw)
    stanzas: list[list[str]] = []
    current: list[str] = []
    for ln in raw.split("\n"):
        s = ln.strip()
        if not s:
            if current:
                stanzas.append(current)
                current = []
        else:
            current.append(s)
    if current:
        stanzas.append(current)
    return "\n\n".join("\n".join(st) for st in stanzas)


def load_existing_titles() -> set[str]:
    titles: set[str] = set()
    for path in POEMS_DIR.glob("*.md"):
        if path.name.startswith("_"):
            continue
        text = path.read_text(encoding="utf-8")
        m = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', text, re.M)
        if m:
            titles.add(m.group(1).strip().lower())
    return titles


def main() -> None:
    existing_titles = load_existing_titles()
    used_slugs: set[str] = {
        p.stem for p in POEMS_DIR.glob("*.md") if not p.name.startswith("_")
    }

    html1 = fetch(f"{BASE}/avtor/{AUTHOR}")
    html2 = fetch(f"{BASE}/avtor/{AUTHOR}&s=50")
    catalog = parse_author_list(html1) + parse_author_list(html2)
    print(f"Found on stihi.ru: {len(catalog)} poems")

    chapter_order: dict[str, int] = {}
    created = 0
    skipped = 0
    failed: list[str] = []

    for item in reversed(catalog):
        title = item["title"]
        if title.lower() in existing_titles:
            skipped += 1
            continue

        slug = slugify(title)
        base = slug
        n = 2
        while slug in used_slugs:
            slug = f"{base}-{n}"
            n += 1

        try:
            html = fetch(f"{BASE}{item['path']}")
            body = parse_poem_body(html)
            if not body:
                failed.append(title)
                continue
        except Exception as e:
            failed.append(f"{title} ({e})")
            continue

        chapter = GENRE_CHAPTER.get(item["genre"], "nachalo")
        chapter_order[chapter] = chapter_order.get(chapter, 0) + 10
        order = chapter_order[chapter]

        md = (
            "---\n"
            f'title: "{title}"\n'
            f"chapter: {chapter}\n"
            f"order: {order}\n"
            "illustration: pending\n"
            "featured: false\n"
            "---\n\n"
            f"{body}\n"
        )
        (POEMS_DIR / f"{slug}.md").write_text(md, encoding="utf-8")
        used_slugs.add(slug)
        existing_titles.add(title.lower())
        created += 1
        print(f"  + {slug}.md")
        time.sleep(0.35)

    print(f"\nCreated: {created}, skipped (already on site): {skipped}")
    if failed:
        print(f"Failed ({len(failed)}):")
        for f in failed[:15]:
            print(" ", f)


if __name__ == "__main__":
    main()
