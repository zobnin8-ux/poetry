import Link from "next/link";
import { chapters } from "../../../content/chapters";
import { getAllPoems, getPoemsByChapter } from "@/lib/content";

export default function KnigaPage() {
  const all = getAllPoems();
  const illustrated = all.filter((p) => p.illustration === "ready");

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="mb-2 text-3xl text-[var(--color-ink)]">Оглавление</h1>
      <p className="mb-12 text-[var(--color-ink-muted)]">
        {all.length} {poemCountLabel(all.length)} в собрании
      </p>

      <ol className="space-y-10">
        {chapters.map((chapter) => {
          const poems = getPoemsByChapter(chapter.id);
          return (
            <li key={chapter.id}>
              <Link
                href={`/kniga/${chapter.id}`}
                className="group flex items-baseline justify-between gap-4 no-underline"
              >
                <span className="text-xl text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
                  <span className="mr-3 text-[var(--color-accent)]">
                    {chapter.roman}.
                  </span>
                  {chapter.title}
                </span>
                <span className="shrink-0 text-sm text-[var(--color-ink-muted)]">
                  {poems.length > 0 ? poems.length : "—"}
                </span>
              </Link>
              {poems.length > 0 && (
                <ul className="mt-3 ml-8 space-y-1 border-l border-[var(--color-parchment-deep)] pl-4 text-sm text-[var(--color-ink-muted)]">
                  {poems.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/stih/${p.slug}`}
                        className="hover:text-[var(--color-ink)]"
                      >
                        {p.title}
                        {p.illustration === "ready" && " · ◆"}
                        {p.illustration === "pending" && " · …"}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-16 space-y-3 border-t border-[var(--color-parchment-deep)] pt-10 text-sm">
        <Link href="/nachalo" className="block text-[var(--color-accent)]">
          С чего начать →
        </Link>
        {illustrated.length > 0 && (
          <Link href="/s-risunkom" className="block text-[var(--color-accent)]">
            Стихи с иллюстрацией ({illustrated.length}) →
          </Link>
        )}
      </div>
    </div>
  );
}

function poemCountLabel(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return "стихотворений";
  if (mod10 === 1) return "стихотворение";
  if (mod10 >= 2 && mod10 <= 4) return "стихотворения";
  return "стихотворений";
}
