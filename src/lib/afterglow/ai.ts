import { templates } from "./theme";
import { moods } from "./theme";
import type { AIStyleSuggestion, Memory, Mood, MusicAttachment, TemplateId } from "./types";

/** System prompt for Gemini — analyses ONLY user material. */
export const GEMINI_SYSTEM_PROMPT = `You are AFTERGLOW's layout designer for a digital scrapbook.
RULES:
1. Use ONLY the user's material: story text, photo notes, music (title/artist/link), details, optional design description.
2. NEVER invent events, people, places, dates or feelings that are not present in the input. Captions may only rephrase or quote the user's words. If information is missing, leave captions short or empty.
3. Choose exactly one template: single | two-column | asymmetric | row-three | collage. Prefer a template whose slot count matches the number of photos.
4. Choose one mood: nostalgic | joyful | dreamy. Base it on the user's wording and the music mood.
5. Accent colors must come from the AFTERGLOW palette: #443025 #7F5836 #AA7F66 #EC9C9D #F2CF2A #F6F1E7.
6. Return JSON matching the schema, no prose.`;

export const GEMINI_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    template: { type: "string", enum: ["single", "two-column", "asymmetric", "row-three", "collage"] },
    mood: { type: "string", enum: ["nostalgic", "joyful", "dreamy"] },
    accentColors: { type: "array", items: { type: "string", enum: ["#443025", "#7F5836", "#AA7F66", "#EC9C9D", "#F2CF2A", "#F6F1E7"] }, minItems: 1, maxItems: 3 },
    title: { type: "string", description: "Taken or shortened from the user's own title/story" },
    captions: { type: "array", items: { type: "string" }, description: "One per photo, derived only from user notes" },
    stickers: { type: "array", items: { type: "string" }, maxItems: 3 },
    reasoning: { type: "string" },
  },
  required: ["template", "mood", "accentColors", "title", "captions", "stickers", "reasoning"],
} as const;

const moodWords: Record<Mood, string[]> = {
  nostalgic: ["помню", "детств", "бабушк", "старый", "раньше", "remember", "childhood", "old", "лето", "дом"],
  joyful: ["смех", "весел", "праздник", "радост", "друз", "party", "fun", "happy", "день рождения", "танц"],
  dreamy: ["тиш", "море", "облак", "спокой", "закат", "calm", "dream", "sea", "утро", "звёзд"],
};

/** Local deterministic fallback when Gemini is unavailable. */
export function localSuggest(input: { title: string; story: string; details: string; photos: { note: string }[]; music?: MusicAttachment | undefined; describe?: string }): AIStyleSuggestion {
  const text = `${input.title} ${input.story} ${input.details} ${input.describe ?? ""} ${input.photos.map((p) => p.note).join(" ")}`.toLowerCase();
  const score: Record<Mood, number> = { nostalgic: 0, joyful: 0, dreamy: 0 };
  (Object.keys(moodWords) as Mood[]).forEach((m) => moodWords[m].forEach((w) => text.includes(w) && score[m]++));
  if (input.music?.mood) score[input.music.mood] += 2;
  const mood = (Object.keys(score) as Mood[]).sort((a, b) => score[b] - score[a])[0] ?? "nostalgic";
  const n = input.photos.length;
  const template: TemplateId = n <= 1 ? "single" : n === 2 ? "two-column" : n === 3 ? (mood === "joyful" ? "asymmetric" : "row-three") : "collage";
  return {
    template,
    mood,
    accentColors: moods[mood].accents,
    title: input.title || input.story.split(/[.!?]/)[0]?.slice(0, 40) || "",
    captions: input.photos.map((p) => p.note),
    stickers: mood === "joyful" ? ["✿", "☀"] : mood === "dreamy" ? ["☁", "✧"] : ["❦", "✉"],
    reasoning: `Локальный анализ: ${n} фото → «${templates.find((t) => t.id === template)?.name}», настроение по словам и музыке.`,
  };
}
