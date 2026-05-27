"""Probe stihi.ru author page for poem URLs (one-off import helper)."""
import re
import urllib.request

URL = "https://stihi.ru/avtor/boeing75"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8", errors="replace")


def main() -> None:
    html = fetch(URL)
    print("html_len", len(html))
    # Stihi poem URLs: /YYYY/NNNN or /YYYY/NNNN-NN
    pattern = re.compile(
        r'<a[^>]+href="(/20\d{2}/\d+(?:-\d+)?)"[^>]*>([^<]+)</a>',
        re.I,
    )
    seen: set[str] = set()
    poems: list[tuple[str, str]] = []
    for path, title in pattern.findall(html):
        if path in seen:
            continue
        seen.add(path)
        t = re.sub(r"\s+", " ", title).strip()
        if t and not t.startswith("http"):
            poems.append((path, t))
    print("poems_found", len(poems))
    for path, title in poems[:15]:
        print(path, "|", title[:60])
    if len(poems) > 15:
        print("...")
        for path, title in poems[-5:]:
            print(path, "|", title[:60])


if __name__ == "__main__":
    main()
