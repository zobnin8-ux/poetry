import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

export function SiteHeader() {
  const site = getSiteConfig();

  return (
    <header className="border-b border-[var(--color-parchment-deep)] bg-[var(--color-parchment)]/90">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-lg tracking-tight text-[var(--color-ink)] no-underline hover:text-[var(--color-accent)]"
        >
          {site.title}
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-5 gap-y-1 text-sm text-[var(--color-ink-muted)]">
          <Link href="/kniga" className="hover:text-[var(--color-ink)]">
            Книга
          </Link>
          <Link href="/hudozhnik" className="hover:text-[var(--color-ink)]">
            Художник
          </Link>
          <Link href="/avtor" className="hover:text-[var(--color-ink)]">
            Автор
          </Link>
        </nav>
      </div>
    </header>
  );
}
