/** Декоративный элемент страницы (как на макете — тонкий орнамент по центру). */
export function BookOrnament({ place }: { place: "head" | "foot" }) {
  return (
    <div
      className={`book-ornament book-ornament--${place}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 72 14"
        className="book-ornament__svg"
        xmlns="http://www.w3.org/2000/svg"
      >
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
      </svg>
    </div>
  );
}
