export function PoemBody({
  body,
  className = "",
}: {
  body: string;
  className?: string;
}) {
  const lines = body.split("\n").filter((line) => line.trim() !== "");

  return (
    <div
      className={`leading-relaxed text-[var(--color-ink)] ${className}`.trim()}
    >
      {lines.map((line, i) => (
        <span key={i} className="poetry-line">
          {line}
        </span>
      ))}
    </div>
  );
}
