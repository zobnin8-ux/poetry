import Link from "next/link";
import { getPoemBySlug, getSiteConfig } from "@/lib/content";

export default function StartPage() {
  const site = getSiteConfig();
  const poems = site.startSlugs
    .map((slug) => getPoemBySlug(slug))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="mb-4 text-3xl text-[var(--color-ink)]">С чего начать</h1>
      <p className="mb-10 text-lg text-[var(--color-ink-muted)]">
        Несколько стихов, с которых удобно познакомиться с собранием.
      </p>
      <ol className="space-y-4">
        {poems.map((p) =>
          p ? (
            <li key={p.slug}>
              <Link
                href={`/stih/${p.slug}`}
                className="text-lg text-[var(--color-ink)] hover:text-[var(--color-accent)]"
              >
                {p.title}
              </Link>
            </li>
          ) : null,
        )}
      </ol>
      <p className="mt-12 text-sm text-[var(--color-ink-muted)]">
        Список настраивается в{" "}
        <code>content/site.json</code> (поле <code>startSlugs</code>).
      </p>
    </div>
  );
}
