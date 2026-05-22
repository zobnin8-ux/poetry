import { BookOrnament } from "@/components/BookOrnament";
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
  pageNumber: number;
};

export function BookSpread({
  title,
  author,
  body,
  chapterLabel,
  illustration,
  image,
  pageNumber,
}: Props) {
  return (
    <div className="book-desk hidden lg:block">
      <div className="book-spread">
        <div className="book-page book-page--left">
          <BookOrnament place="head" />
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
          <span className="book-bookmark" />
        </div>

        <div className="book-page book-page--right">
          <BookOrnament place="head" />
          <div className="book-page__inner">
            {chapterLabel && (
              <p className="book-colontitle">{chapterLabel}</p>
            )}
            <BookOrnament place="head" variant="title" />
            <h1 className="book-title">{title}</h1>
            <BookOrnament place="foot" variant="title" />
            <p className="book-author">{author}</p>
            <div className="book-poem">
              <PoemBody body={body} />
            </div>
          </div>
          <footer className="book-page__footer">
            {pageNumber > 0 && (
              <p className="book-page-number">
                <span className="book-page-number__line" aria-hidden />
                <span>{pageNumber}</span>
                <span className="book-page-number__line" aria-hidden />
              </p>
            )}
            <BookOrnament place="foot" />
          </footer>
        </div>
      </div>
    </div>
  );
}
