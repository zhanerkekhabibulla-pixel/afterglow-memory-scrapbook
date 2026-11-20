import { templates } from "./theme";
import type { AIStyleSuggestion, Memory, PageItem } from "./types";

export const uid = () => Math.random().toString(36).slice(2, 10);

export function buildItems(m: Pick<Memory, "title" | "date" | "photos" | "music">, s: AIStyleSuggestion, scratch = false): PageItem[] {
  const items: PageItem[] = [];
  let z = 1;
  items.push({ id: uid(), type: "text", x: 6, y: 2, width: 88, height: 9, rotation: 0, zIndex: z++, data: { text: s.title || m.title, variant: "title" } });
  const tpl = templates.find((t) => t.id === s.template)!;
  m.photos.forEach((p, i) => {
    const slot = scratch
      ? { x: 10 + i * 8, y: 15 + i * 8, width: 45, height: 32, rotation: (i % 2 ? 3 : -3) }
      : tpl.slots[i % tpl.slots.length]!;
    items.push({ id: uid(), type: "photo", ...slot, rotation: slot.rotation ?? 0, zIndex: z++, data: { src: p.src, caption: s.captions[i] || p.note } });
  });
  if (m.date) items.push({ id: uid(), type: "text", x: 6, y: 76, width: 40, height: 5, rotation: 0, zIndex: z++, data: { text: m.date, variant: "tag" } });
  s.stickers.forEach((st, i) => items.push({ id: uid(), type: "sticker", x: 80 - i * 12, y: 74, width: 10, height: 7, rotation: i * 12 - 6, zIndex: z++, data: { text: st } }));
  if (m.music) items.push({ id: uid(), type: "music", x: 8, y: 84, width: 84, height: 12, rotation: 0, zIndex: z++, data: { music: m.music } });
  return items;
}
