import { BookOrnament } from "@/components/BookOrnament";
import { IllustrationBlock } from "@/components/IllustrationBlock";
import { PoemBody } from "@/components/PoemBody";
import type { IllustrationStatus } from "@/lib/content";

type Props = {
  title: string;
  body: string;
  chapterLabel?: string;
  illustration: IllustrationStatus;
  image?: string;
  pageNumber: number;
};

export function BookSpread({
  title,
  body,
  chapterLabel,
  illustration,
  image,
  pageNumber,
}: Props) {
  return (
    <div className="book-desk hidden lg:block">
      <div className="book-stage">
        <div className="book-outer">
          <div className="book-edge book-edge--left" aria-hidden />
          <div className="book-spread">
          <div className="book-page book-page--left">
            <div className="book-page__art">
              <IllustrationBlock
                status={illustration}
                image={image}
                title={title}
                layout="book"
              />
            </div>
            <BookOrnament place="foot" />
          </div>

          <div className="book-gutter" aria-hidden>
            <span className="book-gutter__binding" />
            <span className="book-bookmark" />
          </div>

          <div className="book-page book-page--right">
            {chapterLabel && (
              <header className="book-page__header">
                <p className="book-colontitle">{chapterLabel}</p>
                <BookOrnament place="foot" variant="colontitle" />
              </header>
            )}
            <div className="book-page__content">
              <div className="book-page__inner">
                <BookOrnament place="head" variant="title" />
                <h1 className="book-title">{title}</h1>
                <div className="book-poem">
                  <PoemBody body={body} />
                </div>
              </div>
            </div>
            <footer className="book-page__footer">
              <BookOrnament place="foot" />
              {pageNumber > 0 && (
                <p className="book-page-number">{pageNumber}</p>
              )}
            </footer>
          </div>
          </div>
          <div className="book-edge book-edge--right" aria-hidden />
        </div>
      </div>
    </div>
  );
}
