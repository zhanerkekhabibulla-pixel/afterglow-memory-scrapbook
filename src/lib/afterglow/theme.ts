import type { Mood, PageTemplate } from "./types";

export const palette = {
  darkChocolate: "#443025",
  aloewood: "#7F5836",
  milkTea: "#AA7F66",
  sakura: "#EC9C9D",
  mistyRose: "#F2CF2A",
  paper: "#F6F1E7",
  paperDeep: "#EFE7DA",
} as const;

export const fonts = { serif: "Libre Baskerville", sans: "Alegreya Sans" } as const;

export const moods: Record<Mood, { label: string; accents: string[]; paperClass: string; emoji: string }> = {
  nostalgic: { label: "Nostalgic", accents: [palette.aloewood, palette.milkTea], paperClass: "paper-nostalgic", emoji: "🕰" },
  joyful: { label: "Joyful", accents: [palette.mistyRose, palette.sakura], paperClass: "paper-joyful", emoji: "☀" },
  dreamy: { label: "Dreamy / Calm", accents: [palette.sakura, palette.milkTea], paperClass: "paper-dreamy", emoji: "☁" },
};

export const templates: PageTemplate[] = [
  { id: "single", name: "Одно крупное фото", slots: [{ x: 8, y: 14, width: 84, height: 58, rotation: -1 }] },
  { id: "two-column", name: "Две колонки", slots: [{ x: 6, y: 16, width: 42, height: 52 }, { x: 52, y: 16, width: 42, height: 52 }] },
  { id: "asymmetric", name: "Асимметричная сетка", slots: [{ x: 6, y: 12, width: 54, height: 46, rotation: -2 }, { x: 62, y: 18, width: 32, height: 26, rotation: 3 }, { x: 58, y: 48, width: 36, height: 26, rotation: -1 }] },
  { id: "row-three", name: "Ряд из 3 кадров", slots: [{ x: 5, y: 26, width: 28, height: 34 }, { x: 36, y: 26, width: 28, height: 34 }, { x: 67, y: 26, width: 28, height: 34 }] },
  { id: "collage", name: "Коллаж", slots: [{ x: 6, y: 10, width: 42, height: 30, rotation: -3 }, { x: 52, y: 12, width: 42, height: 30, rotation: 2 }, { x: 8, y: 44, width: 40, height: 28, rotation: 2 }, { x: 52, y: 46, width: 42, height: 28, rotation: -2 }] },
];

export const demoTracks = [
  { title: "Harvest Moon", artist: "Neil Young", source: "spotify" as const, url: "https://open.spotify.com/track/2HU4dKHzQyKvSn4Ez0l9Ln", mood: "nostalgic" as const },
  { title: "Walking on Sunshine", artist: "Katrina & The Waves", source: "youtube" as const, url: "https://music.youtube.com/watch?v=iPUmE-tne5U", mood: "joyful" as const },
  { title: "Clair de Lune", artist: "Claude Debussy", source: "apple" as const, url: "https://music.apple.com/", mood: "dreamy" as const },
];
