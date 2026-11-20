export type Mood = "nostalgic" | "joyful" | "dreamy";
export type TemplateId = "single" | "two-column" | "asymmetric" | "row-three" | "collage";
export type ItemType = "photo" | "text" | "sticker" | "music";

export interface MusicAttachment {
  title: string;
  artist: string;
  source: "spotify" | "apple" | "youtube" | "other";
  url: string;
  mood?: Mood | undefined;
}

export interface PageItem {
  id: string;
  type: ItemType;
  /** position & size in % of page (0–100) */
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  data: {
    src?: string; // photo
    caption?: string; // photo back-side note
    text?: string; // text / sticker
    variant?: "title" | "body" | "tag";
    music?: MusicAttachment | undefined;
  };
}

export interface PageTemplate {
  id: TemplateId;
  name: string;
  /** photo slots in % */
  slots: { x: number; y: number; width: number; height: number; rotation?: number }[];
}

export interface AIStyleSuggestion {
  template: TemplateId;
  mood: Mood;
  accentColors: string[];
  title: string;
  captions: string[];
  stickers: string[];
  reasoning: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  story: string;
  details: string;
  photos: { src: string; note: string }[];
  music?: MusicAttachment | undefined;
  mood: Mood;
  template: TemplateId;
  designMethod: "template" | "describe" | "scratch";
  items: PageItem[];
  createdAt: number;
}
