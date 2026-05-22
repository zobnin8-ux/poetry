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
  getPoemPageNumber,
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
  const pageNumber = getPoemPageNumber(slug);

  if (!hasVisual) {
    return (
      <article className="poem-sheet mx-auto max-w-2xl px-8 py-16">
        <div className="poem-sheet__inner">
          {chapterLabel && (
            <p className="mb-6 text-center text-sm text-[var(--color-accent)]">
              {chapterLabel}
            </p>
          )}
          <h1 className="mb-2 text-center text-3xl text-[var(--color-ink)]">
            {poem.title}
          </h1>
          <p className="mb-12 text-center text-[var(--color-ink-muted)] italic">
            {site.author}
          </p>
          <div className="poem-sheet__body">
            <PoemBody body={poem.body} />
          </div>
          {pageNumber > 0 && (
            <p className="poem-sheet__page-num">{pageNumber}</p>
          )}
        </div>
        <PoemNav prev={prev} next={next} chapterId={poem.chapter} />
      </article>
    );
  }

  return (
    <article className="poem-article poem-article--spread mx-auto max-w-[96rem] w-full px-3 py-4 lg:px-4 lg:py-2">
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
        <div className="book-page-mobile poem-sheet__inner px-2 py-2">
          <h1 className="mb-2 text-center text-3xl text-[var(--color-ink)]">
            {poem.title}
          </h1>
          <p className="mb-8 text-center text-[var(--color-ink-muted)] italic">
            {site.author}
          </p>
          <div className="poem-sheet__body">
            <PoemBody body={poem.body} />
          </div>
        </div>
      </div>

      <BookSpread
        title={poem.title}
        author={site.author}
        body={poem.body}
        chapterLabel={chapterLabel}
        illustration={poem.illustration}
        image={poem.image}
        pageNumber={pageNumber}
      />

      <div className="poem-article__nav mx-auto w-full max-w-2xl lg:max-w-4xl">
        <PoemNav prev={prev} next={next} chapterId={poem.chapter} />
      </div>
    </article>
  );
}
