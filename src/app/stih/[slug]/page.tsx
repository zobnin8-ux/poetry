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
  const hasVisual =
    poem.illustration === "ready" || poem.illustration === "pending";

  if (!hasVisual) {
    return (
      <article className="mx-auto max-w-2xl px-6 py-14">
        {chapter && (
          <p className="mb-6 text-sm text-[var(--color-accent)]">
            {chapter.roman}. {chapter.title}
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
    <article className="mx-auto max-w-6xl px-6 py-14">
      {chapter && (
        <p className="mb-8 text-sm text-[var(--color-accent)] lg:mb-10">
          {chapter.roman}. {chapter.title}
        </p>
      )}

      {/* Мобильный: картинка сверху, стих снизу */}
      <div className="lg:hidden">
        <h1 className="mb-2 text-3xl text-[var(--color-ink)]">{poem.title}</h1>
        <p className="mb-8 text-[var(--color-ink-muted)] italic">
          {site.author}
        </p>
        <IllustrationBlock
          status={poem.illustration}
          image={poem.image}
          title={poem.title}
          layout="stack"
        />
        <div className="mt-10">
          <PoemBody body={poem.body} />
        </div>
      </div>

      {/* Десктоп: разворот — иллюстрация слева, стих справа */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(300px,44%)_minmax(0,1fr)] lg:items-start lg:gap-14 xl:gap-20">
        <div className="sticky top-20">
          <IllustrationBlock
            status={poem.illustration}
            image={poem.image}
            title={poem.title}
            layout="spread"
          />
        </div>
        <div className="min-w-0 pt-1">
          <h1 className="mb-3 text-[2rem] leading-tight text-[var(--color-ink)]">
            {poem.title}
          </h1>
          <p className="mb-10 text-lg text-[var(--color-ink-muted)] italic">
            {site.author}
          </p>
          <PoemBody body={poem.body} className="text-[1.05rem]" />
        </div>
      </div>

      <PoemNav prev={prev} next={next} chapterId={poem.chapter} />
    </article>
  );
}
