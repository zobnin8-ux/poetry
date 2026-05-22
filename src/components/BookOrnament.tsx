type Props = {
  place: "head" | "foot";
  variant?: "page" | "title" | "colontitle";
};

export function BookOrnament({ place, variant = "page" }: Props) {
  if (variant === "colontitle") {
    return (
      <div className="book-ornament book-ornament--colontitle" aria-hidden>
        <svg viewBox="0 0 48 10" className="book-ornament__svg" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5 H20 M28 5 H46" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="24" cy="5" r="1" fill="currentColor" />
        </svg>
      </div>
    );
  }

  const isTitle = variant === "title";

  return (
    <div
      className={`book-ornament book-ornament--${place}${isTitle ? " book-ornament--title" : ""}`}
      aria-hidden
    >
      <svg
        viewBox={isTitle ? "0 0 100 16" : "0 0 56 12"}
        className="book-ornament__svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isTitle ? (
          <>
            <path
              d="M8 8 C14 4 20 4 26 8 C32 12 38 12 44 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <circle cx="26" cy="8" r="1.2" fill="currentColor" />
            <path d="M22 8 L26 5 L30 8 L26 11 Z" fill="currentColor" opacity="0.85" />
          </>
        ) : (
          <>
            <path d="M4 6 H24 M32 6 H52" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="28" cy="6" r="1" fill="currentColor" />
            <path d="M26 6 L28 4 L30 6 L28 8 Z" fill="currentColor" opacity="0.8" />
          </>
        )}
      </svg>
    </div>
  );
}
