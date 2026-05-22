import Link from "next/link";
import { getIllustratedPoems } from "@/lib/content";

export default function IllustratedPage() {
  const poems = getIllustratedPoems();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="mb-10 text-3xl text-[var(--color-ink)]">
        Стихи с иллюстрацией
      </h1>
      {poems.length === 0 ? (
        <p className="text-[var(--color-ink-muted)]">
          Пока нет стихов с готовыми иллюстрациями. Когда рисунок готов,
          укажите в файле стиха: <code>illustration: ready</code> и путь к
          картинке.
        </p>
      ) : (
        <ul className="space-y-4">
          {poems.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/stih/${p.slug}`}
                className="text-lg text-[var(--color-ink)] hover:text-[var(--color-accent)]"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
