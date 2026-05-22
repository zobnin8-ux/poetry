type Props = {
  place: "head" | "foot";
  variant?: "page" | "title";
};

/** Декоративный элемент — на полях страницы или вокруг заголовка (как на макете). */
export function BookOrnament({ place, variant = "page" }: Props) {
  const isTitle = variant === "title";

  return (
    <div
      className={`book-ornament book-ornament--${place}${isTitle ? " book-ornament--title" : ""}`}
      aria-hidden
    >
      <svg
        viewBox={isTitle ? "0 0 120 12" : "0 0 72 14"}
        className="book-ornament__svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isTitle ? (
          <>
            <path
              d="M2 6 H46 M74 6 H118"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <circle cx="60" cy="6" r="1.1" fill="currentColor" />
            <path
              d="M56 6 L60 3.5 L64 6 L60 8.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
            />
          </>
        ) : (
          <>
            <path
              d="M4 7 Q18 2 36 7 T68 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <circle cx="36" cy="7" r="1.2" fill="currentColor" />
            <path
              d="M30 7 L36 4 L42 7 L36 10 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.45"
            />
          </>
        )}
      </svg>
    </div>
  );
}
