import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

export default function AboutCollectionPage() {
  const site = getSiteConfig();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 prose-book">
      <h1 className="mb-8 text-3xl text-[var(--color-ink)]">О собрании</h1>
      <div className="space-y-6 text-lg leading-relaxed text-[var(--color-ink-muted)]">
        <p>
          <strong className="font-normal text-[var(--color-ink)]">
            {site.title}
          </strong>{" "}
          — собрание стихов {site.author}. Здесь можно читать медленно, как в
          книге: по главам, с иллюстрациями там, где они уже готовы, и с
          тихими пометками там, где художник ещё работает над рисунком.
        </p>
        <p>
          Название родилось из стиха о том, что жизнь словно пишут карандашом —
          что-то можно подчеркнуть, что-то стереть, а что-то остаётся следом
          судьбы, который не мы выбираем.
        </p>
        <p>
          Собрание пополняется: новые стихи появляются в оглавлении по мере
          добавления.
        </p>
      </div>
      <p className="mt-12">
        <Link href="/kniga" className="text-[var(--color-accent)]">
          Открыть оглавление →
        </Link>
      </p>
    </div>
  );
}
