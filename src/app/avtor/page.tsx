import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

export default function AuthorPage() {
  const site = getSiteConfig();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="mb-8 text-3xl text-[var(--color-ink)]">{site.author}</h1>
      <div className="space-y-6 text-lg leading-relaxed text-[var(--color-ink-muted)]">
        <p>
          Здравствуйте, дорогие мои. Спасибо, что заходите сюда — в маленький
          дом, построенный из слов, чувств и тех тихих мгновений, которые мы
          иногда скрываем даже от себя.
        </p>
        <p>
          Каждая ваша встреча со строками — как тёплый свет в окне в долгой
          дороге. Пусть здесь вам будет спокойно. Пусть каждое стихотворение
          ложится на сердце мягко — как плед в прохладный вечер.
        </p>
        <p>
          Часть стихов также публиковалась на портале{" "}
          <a
            href={site.stihiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] underline-offset-2 hover:underline"
          >
            Стихи.ру
          </a>
          . Полное собрание с иллюстрациями — здесь.
        </p>
      </div>
      <p className="mt-12">
        <Link href="/" className="text-[var(--color-accent)]">
          На главную →
        </Link>
      </p>
    </div>
  );
}
