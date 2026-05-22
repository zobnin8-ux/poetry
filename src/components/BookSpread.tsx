import { IllustrationBlock } from "@/components/IllustrationBlock";
import { PoemBody } from "@/components/PoemBody";
import type { IllustrationStatus } from "@/lib/content";

type Props = {
  title: string;
  author: string;
  body: string;
  chapterLabel?: string;
  illustration: IllustrationStatus;
  image?: string;
};

export function BookSpread({
  title,
  author,
  body,
  chapterLabel,
  illustration,
  image,
}: Props) {
  return (
    <div className="book-desk hidden lg:block">
      <div className="book-spread">
        {/* Левая страница — фиксирована при прокрутке */}
        <div className="book-page-wrap book-page-wrap--left">
          <div className="book-page book-page--left">
            <div className="book-page__art">
              <IllustrationBlock
                status={illustration}
                image={image}
                title={title}
                layout="book"
              />
            </div>
          </div>
        </div>

        {/* Переплёт */}
        <div className="book-gutter" aria-hidden />

        {/* Правая страница — растёт со стихом, скроллится вместе со страницей */}
        <div className="book-page book-page--right">
          {chapterLabel && (
            <p className="book-colontitle book-colontitle--right">
              {chapterLabel}
            </p>
          )}
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{author}</p>
          <div className="book-poem">
            <PoemBody body={body} className="text-[1.05rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
