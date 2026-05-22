function parseStanzas(body: string): string[][] {
  const stanzas: string[][] = [];
  let current: string[] = [];

  for (const line of body.split("\n")) {
    if (line.trim() === "") {
      if (current.length > 0) {
        stanzas.push(current);
        current = [];
      }
    } else {
      current.push(line);
    }
  }

  if (current.length > 0) {
    stanzas.push(current);
  }

  return stanzas;
}

export function PoemBody({
  body,
  className = "",
}: {
  body: string;
  className?: string;
}) {
  const stanzas = parseStanzas(body.trim());

  return (
    <div
      className={`text-[var(--color-ink)] ${className}`.trim()}
      lang="ru"
    >
      {stanzas.map((stanza, stanzaIndex) => (
        <div key={stanzaIndex} className="poetry-stanza">
          {stanza.map((line, lineIndex) => (
            <span key={lineIndex} className="poetry-line">
              {line}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
