import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters } from "../../../../content/chapters";
import { getChapterWithPoems } from "@/lib/content";

type Props = { params: Promise<{ chapter: string }> };

export function generateStaticParams() {
  return chapters.map((c) => ({ chapter: c.id }));
}

export default async function ChapterPage({ params }: Props) {
  const { chapter: chapterId } = await params;
  const data = getChapterWithPoems(chapterId);
  if (!data) notFound();

  const { chapter, poems } = data;

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <p className="mb-2 text-sm text-[var(--color-accent)]">
        <Link href="/kniga" className="hover:text-[var(--color-ink)]">
          Оглавление
        </Link>
      </p>
      <h1 className="mb-10 text-3xl text-[var(--color-ink)]">
        <span className="mr-3 text-[var(--color-accent)]">{chapter.roman}.</span>
        {chapter.title}
      </h1>

      {poems.length === 0 ? (
        <p className="text-[var(--color-ink-muted)] leading-relaxed">
          В этой главе пока нет стихов. Добавьте файлы в папку{" "}
          <code className="text-sm">content/poems/</code> с полем{" "}
          <code className="text-sm">chapter: {chapterId}</code>.
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
