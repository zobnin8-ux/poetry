import Image from "next/image";
import type { IllustrationStatus } from "@/lib/content";

type Props = {
  status: IllustrationStatus;
  image?: string;
  title: string;
  layout?: "stack" | "spread";
};

export function IllustrationBlock({
  status,
  image,
  title,
  layout = "stack",
}: Props) {
  const isSpread = layout === "spread";

  if (status === "ready" && image) {
    return (
      <figure className={isSpread ? "w-full" : "my-10"}>
        <div
          className={
            isSpread
              ? "flex items-center justify-center rounded-sm border border-[var(--color-parchment-deep)] bg-white/60 p-2 shadow-sm"
              : "relative mx-auto max-w-xl overflow-hidden rounded-sm border border-[var(--color-parchment-deep)] bg-white/50"
          }
        >
          <Image
            src={image}
            alt={`Иллюстрация к стихотворению «${title}»`}
            width={1200}
            height={900}
            className={
              isSpread
                ? "h-auto max-h-[min(82vh,820px)] w-full object-contain"
                : "h-auto w-full object-contain"
            }
            sizes={
              isSpread
                ? "(min-width: 1024px) 42vw, 100vw"
                : "(max-width: 1024px) 100vw, 640px"
            }
            priority
          />
        </div>
      </figure>
    );
  }

  if (status === "pending") {
    return (
      <aside
        className={
          isSpread
            ? "flex min-h-[280px] flex-col items-center justify-center rounded-sm border border-dashed border-[var(--color-accent)]/45 bg-[var(--color-parchment-deep)]/35 px-6 py-12 text-center lg:min-h-[360px]"
            : "my-10 rounded-sm border border-dashed border-[var(--color-accent)]/50 bg-[var(--color-parchment-deep)]/40 px-8 py-10 text-center"
        }
        aria-label="Иллюстрация готовится"
      >
        <div
          className="mb-4 h-px w-16 bg-[var(--color-accent)]"
          aria-hidden
        />
        <p className="max-w-xs text-base leading-relaxed text-[var(--color-ink-muted)]">
          Художник работает над иллюстрацией к этому стиху.
          <br />
          Когда она будет готова, она появится здесь.
        </p>
      </aside>
    );
  }

  return null;
}
