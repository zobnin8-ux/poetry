import { notFound } from "next/navigation";
import { IllustrationBlock } from "@/components/IllustrationBlock";
import { PoemBody } from "@/components/PoemBody";
import { PoemNav } from "@/components/PoemNav";
import {
  getAdjacentPoems,
  getAllPoems,
  getChapter,
  getPoemBySlug,
  getSiteConfig,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPoems().map((p) => ({ slug: p.slug }));
}

export default async function PoemPage({ params }: Props) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  if (!poem) notFound();

  const chapter = getChapter(poem.chapter);
  const site = getSiteConfig();
  const { prev, next } = getAdjacentPoems(slug);

  return (
    <article className="mx-auto max-w-2xl px-6 py-14">
      {chapter && (
        <p className="mb-6 text-sm text-[var(--color-accent)]">
          {chapter.roman}. {chapter.title}
        </p>
      )}
      <h1 className="mb-2 text-3xl text-[var(--color-ink)]">{poem.title}</h1>
      <p className="mb-12 text-[var(--color-ink-muted)] italic">{site.author}</p>

      <PoemBody body={poem.body} />

      <IllustrationBlock
        status={poem.illustration}
        image={poem.image}
        title={poem.title}
      />

      <PoemNav prev={prev} next={next} chapterId={poem.chapter} />
    </article>
  );
}
