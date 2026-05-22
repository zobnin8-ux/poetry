import Link from "next/link";
import Image from "next/image";
import { getIllustratedPoems, getSiteConfig } from "@/lib/content";

export default function ArtistPage() {
  const site = getSiteConfig();
  const illustrated = getIllustratedPoems();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="mb-8 text-3xl text-[var(--color-ink)]">Художник</h1>
      <div className="space-y-6 text-lg leading-relaxed text-[var(--color-ink-muted)]">
        <p>
          К стихам этого собрания создаются иллюстрации — чёрно-белые и
          цветные. Рисунки рождаются рядом со строками: иногда стих ждёт
          картину, иногда картина находит свой стих.
        </p>
        <p>{site.artistNote}</p>
        <p>
          Имя художника можно указать в файле{" "}
          <code className="text-sm">content/site.json</code> (поле{" "}
          <code className="text-sm">artistName</code>).
        </p>
      </div>

      {illustrated.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-xl text-[var(--color-ink)]">
            Готовые иллюстрации
          </h2>
          <ul className="space-y-12">
            {illustrated.map((p) => (
              <li key={p.slug}>
                {p.image && (
                  <Link href={`/stih/${p.slug}`}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={800}
                      height={600}
                      className="mb-3 h-auto w-full rounded-sm border border-[var(--color-parchment-deep)] object-contain"
                    />
                  </Link>
                )}
                <Link
                  href={`/stih/${p.slug}`}
                  className="text-lg text-[var(--color-accent)] hover:text-[var(--color-ink)]"
                >
                  {p.title} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-12">
        <Link href="/s-risunkom" className="text-[var(--color-accent)]">
          Все стихи с иллюстрацией →
        </Link>
      </p>
    </div>
  );
}
