import Link from "next/link";
import type { Poem } from "@/lib/content";

type Props = {
  prev: Poem | null;
  next: Poem | null;
  chapterId: string;
};

export function PoemNav({ prev, next, chapterId }: Props) {
  return (
    <nav className="mt-16 flex flex-col gap-6 border-t border-[var(--color-parchment-deep)] pt-10 text-sm text-[var(--color-ink-muted)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/stih/${prev.slug}`}
            className="hover:text-[var(--color-ink)]"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/stih/${next.slug}`}
            className="text-right hover:text-[var(--color-ink)]"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
      <Link
        href={`/kniga/${chapterId}`}
        className="text-center hover:text-[var(--color-ink)]"
      >
        к оглавлению главы
      </Link>
      <Link href="/kniga" className="text-center hover:text-[var(--color-ink)]">
        ко всему оглавлению
      </Link>
    </nav>
  );
}
