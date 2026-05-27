import re
from pathlib import Path

rows = []
for p in sorted(Path("content/poems").glob("*.md")):
    if p.name.startswith("_"):
        continue
    t = p.read_text(encoding="utf-8")
    title = re.search(r'^title:\s*"([^"]+)"', t, re.M)
    if title:
        rows.append(title.group(1))

out = Path(__file__).parent / "all-titles.txt"
out.write_text("\n".join(sorted(rows, key=str.lower)), encoding="utf-8")
