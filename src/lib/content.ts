import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { chapters, getChapter as getChapterById, type Chapter } from "../../content/chapters";

export { chapters, getChapterById as getChapter };
export type { Chapter };

export type IllustrationStatus = "none" | "pending" | "ready";

export type Poem = {
  slug: string;
  title: string;
  chapter: string;
  order: number;
  illustration: IllustrationStatus;
  image?: string;
  body: string;
  featured?: boolean;
};

const poemsDir = path.join(process.cwd(), "content", "poems");

function parsePoemFile(filename: string): Poem {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(poemsDir, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    chapter: String(data.chapter ?? "nachalo"),
    order: Number(data.order ?? 0),
    illustration: (data.illustration as IllustrationStatus) ?? "none",
    image: data.image ? String(data.image) : undefined,
    body: content.trim(),
    featured: Boolean(data.featured),
  };
}

export function getAllPoems(): Poem[] {
  if (!fs.existsSync(poemsDir)) return [];
  return fs
    .readdirSync(poemsDir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(parsePoemFile)
    .sort((a, b) => {
      const chapterOrder =
        chapters.findIndex((c) => c.id === a.chapter) -
        chapters.findIndex((c) => c.id === b.chapter);
      if (chapterOrder !== 0) return chapterOrder;
      return a.order - b.order;
    });
}

export function getPoemBySlug(slug: string): Poem | undefined {
  return getAllPoems().find((p) => p.slug === slug);
}

export function getPoemsByChapter(chapterId: string): Poem[] {
  return getAllPoems().filter((p) => p.chapter === chapterId);
}

export function getIllustratedPoems(): Poem[] {
  return getAllPoems().filter((p) => p.illustration === "ready");
}

export function getChapterWithPoems(chapterId: string): {
  chapter: Chapter;
  poems: Poem[];
} | null {
  const chapter = getChapterById(chapterId);
  if (!chapter) return null;
  return { chapter, poems: getPoemsByChapter(chapterId) };
}

export function getAdjacentPoems(slug: string): {
  prev: Poem | null;
  next: Poem | null;
} {
  const all = getAllPoems();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export function getSiteConfig() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", "site.json"),
    "utf8",
  );
  return JSON.parse(raw) as {
    title: string;
    author: string;
    subtitle: string;
    artistName: string;
    artistNote: string;
    stihiUrl: string;
    startSlugs: string[];
  };
}
