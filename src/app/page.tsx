import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-4 text-sm tracking-widest text-[var(--color-accent)] uppercase">
        {site.subtitle}
      </p>
      <h1 className="mb-6 text-4xl leading-tight font-normal text-[var(--color-ink)] md:text-5xl">
        {site.title}
      </h1>
      <p className="mb-12 text-xl text-[var(--color-ink-muted)] italic">
        {site.author}
      </p>
      <Link
        href="/kniga"
        className="rounded-sm border border-[var(--color-accent)] bg-transparent px-10 py-3 text-[var(--color-ink)] no-underline transition hover:bg-[var(--color-parchment-deep)]"
      >
        Открыть книгу
      </Link>
      <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-ink-muted)]">
        <Link href="/o-sobranii" className="hover:text-[var(--color-ink)]">
          о собрании
        </Link>
        <Link href="/hudozhnik" className="hover:text-[var(--color-ink)]">
          художник
        </Link>
        <Link href="/avtor" className="hover:text-[var(--color-ink)]">
          автор
        </Link>
        <Link href="/nachalo" className="hover:text-[var(--color-ink)]">
          с чего начать
        </Link>
      </div>
    </div>
  );
}
