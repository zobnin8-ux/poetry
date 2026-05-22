export type Chapter = {
  id: string;
  title: string;
  roman: string;
};

export const chapters: Chapter[] = [
  { id: "nachalo", title: "Начало", roman: "I" },
  { id: "svet", title: "Свет и любовь", roman: "II" },
  { id: "ten", title: "Свет и тень", roman: "III" },
  { id: "blizkie", title: "Близкие", roman: "IV" },
  { id: "doroga", title: "Дорога", roman: "V" },
  { id: "gorod", title: "Город и день", roman: "VI" },
  { id: "tajna", title: "За порогом", roman: "VII" },
  { id: "pamyat", title: "Память", roman: "VIII" },
];

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}
