import type { Metadata } from "next";
import { Literata } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const literata = Literata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-literata",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Жизнь напишу карандашом",
  description: "Собрание стихов Андрея Зобнина",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={literata.variable}>
      <body className="antialiased">
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer border-t border-[var(--color-parchment-deep)] py-10 text-center text-sm text-[var(--color-ink-muted)]">
          <p>© Андрей Зобнин</p>
        </footer>
      </body>
    </html>
  );
}
