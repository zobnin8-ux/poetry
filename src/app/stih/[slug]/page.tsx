import { notFound } from "next/navigation";
import { BookSpread } from "@/components/BookSpread";
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
  const hasVisual =
    poem.illustration === "ready" || poem.illustration === "pending";
  const chapterLabel = chapter
    ? `${chapter.roman}. ${chapter.title}`
    : undefined;

  if (!hasVisual) {
    return (
      <article className="mx-auto max-w-2xl px-6 py-14">
        {chapterLabel && (
          <p className="mb-6 text-sm text-[var(--color-accent)]">
            {chapterLabel}
          </p>
        )}
        <h1 className="mb-2 text-3xl text-[var(--color-ink)]">{poem.title}</h1>
        <p className="mb-12 text-[var(--color-ink-muted)] italic">
          {site.author}
        </p>
        <PoemBody body={poem.body} />
        <PoemNav prev={prev} next={next} chapterId={poem.chapter} />
      </article>
    );
  }

  return (
    <article className="mx-auto max-w-[90rem] px-3 py-10 lg:px-5 lg:py-12">
      {/* Мобильный: два «листа» друг под другом */}
      <div className="lg:hidden">
        {chapterLabel && (
          <p className="mb-6 text-sm text-[var(--color-accent)]">
            {chapterLabel}
          </p>
        )}
        <div className="book-page-mobile mb-6">
          <IllustrationBlock
            status={poem.illustration}
            image={poem.image}
            title={poem.title}
            layout="stack"
          />
        </div>
        <div className="book-page-mobile">
          <h1 className="mb-2 text-3xl text-[var(--color-ink)]">{poem.title}</h1>
          <p className="mb-8 text-[var(--color-ink-muted)] italic">
            {site.author}
          </p>
          <PoemBody body={poem.body} />
        </div>
      </div>

      <BookSpread
        title={poem.title}
        author={site.author}
        body={poem.body}
        chapterLabel={chapterLabel}
        illustration={poem.illustration}
        image={poem.image}
      />

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <PoemNav prev={prev} next={next} chapterId={poem.chapter} />
      </div>
    </article>
  );
}
