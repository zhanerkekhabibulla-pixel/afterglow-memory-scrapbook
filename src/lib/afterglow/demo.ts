import { localSuggest } from "./ai";
import { buildItems } from "./layout";
import { demoTracks } from "./theme";
import type { Memory } from "./types";

const img = (s: string) => `https://picsum.photos/seed/${s}/600/800`;

function make(id: string, title: string, date: string, story: string, photos: { src: string; note: string }[], musicIdx: number): Memory {
  const music = demoTracks[musicIdx];
  const base = { title, date, story, details: "", photos, music };
  const s = localSuggest(base);
  return { id, ...base, mood: s.mood, template: s.template, designMethod: "template", items: buildItems(base, s), createdAt: Date.now() - musicIdx * 1e8 };
}

export const demoMemories: Memory[] = [
  make("demo-nostalgic", "Лето у бабушки", "Июль 2009", "Помню старый дом, запах яблок и вечера на веранде.", [
    { src: img("granny-house"), note: "Веранда, где мы пили чай" },
    { src: img("apples-old"), note: "Яблоки из сада" },
  ], 0),
  make("demo-joyful", "День рождения Айи", "12 марта 2025", "Смех, торт и танцы с друзьями до полуночи.", [
    { src: img("party-cake"), note: "Торт со свечами" },
    { src: img("friends-dance"), note: "Танцы" },
    { src: img("balloons-fun"), note: "Шарики" },
  ], 1),
  make("demo-dreamy", "Утро у моря", "Сентябрь 2024", "Тишина, спокойное море и облака над водой.", [
    { src: img("calm-sea-morning"), note: "Первый свет над водой" },
  ], 2),
];
