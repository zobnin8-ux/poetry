import Image from "next/image";
import type { IllustrationStatus } from "@/lib/content";

type Props = {
  status: IllustrationStatus;
  image?: string;
  title: string;
};

export function IllustrationBlock({ status, image, title }: Props) {
  if (status === "ready" && image) {
    return (
      <figure className="my-10">
        <div className="relative mx-auto max-w-xl overflow-hidden rounded-sm border border-[var(--color-parchment-deep)] bg-white/50">
          <Image
            src={image}
            alt={`Иллюстрация к стихотворению «${title}»`}
            width={900}
            height={700}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </figure>
    );
  }

  if (status === "pending") {
    return (
      <aside
        className="my-10 rounded-sm border border-dashed border-[var(--color-accent)]/50 bg-[var(--color-parchment-deep)]/40 px-8 py-10 text-center"
        aria-label="Иллюстрация готовится"
      >
        <div
          className="mx-auto mb-4 h-px w-16 bg-[var(--color-accent)]"
          aria-hidden
        />
        <p className="text-base leading-relaxed text-[var(--color-ink-muted)]">
          Художник работает над иллюстрацией к этому стиху.
          <br />
          Когда она будет готова, она появится здесь.
        </p>
      </aside>
    );
  }

  return null;
}
