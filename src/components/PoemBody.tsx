export function PoemBody({ body }: { body: string }) {
  const lines = body.split("\n").filter((line) => line.trim() !== "");

  return (
    <div className="text-lg leading-relaxed text-[var(--color-ink)]">
      {lines.map((line, i) => (
        <span key={i} className="poetry-line">
          {line}
        </span>
      ))}
    </div>
  );
}
