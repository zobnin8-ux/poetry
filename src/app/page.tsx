import Image from "next/image";
import Link from "next/link";
import { CoverPageMarker } from "@/components/CoverPageMarker";

export default function HomePage() {
  return (
    <>
      <CoverPageMarker />
      <div className="cover-entry">
      <Link
        href="/kniga"
        className="cover-entry__hit"
        aria-label="Открыть книгу — перейти к оглавлению"
      >
        <span className="sr-only">Открыть книгу</span>
        <div className="cover-entry__stage">
          <Image
            src="/images/cover.png"
            alt="Обложка собрания «Жизнь напишу карандашом» — Андрей Зобнин"
            width={1024}
            height={682}
            priority
            className="cover-entry__img"
            sizes="100vw"
          />
        </div>
      </Link>
      <nav className="cover-entry__aside" aria-label="Дополнительные ссылки">
        <Link href="/o-sobranii">о собрании</Link>
        <Link href="/avtor">автор</Link>
        <Link href="/hudozhnik">художник</Link>
      </nav>
    </div>
    </>
  );
}
