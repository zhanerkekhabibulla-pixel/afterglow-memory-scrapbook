import { useEffect, useState } from "react";
import { demoMemories } from "./demo";
import type { Memory } from "./types";

const KEY = "afterglow.memories.v1";
const listeners = new Set<() => void>();

export function loadMemories(): Memory[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Memory[];
  } catch {}
  localStorage.setItem(KEY, JSON.stringify(demoMemories));
  return demoMemories;
}

export function saveMemory(m: Memory) {
  const all = loadMemories().filter((x) => x.id !== m.id);
  localStorage.setItem(KEY, JSON.stringify([m, ...all]));
  listeners.forEach((l) => l());
}

export function deleteMemory(id: string) {
  localStorage.setItem(KEY, JSON.stringify(loadMemories().filter((x) => x.id !== id)));
  listeners.forEach((l) => l());
}

export function useMemories() {
  const [list, setList] = useState<Memory[] | null>(null);
  useEffect(() => {
    const f = () => setList(loadMemories());
    f();
    listeners.add(f);
    return () => void listeners.delete(f);
  }, []);
  return list;
}

export function useMemory(id: string) {
  const list = useMemories();
  return list === null ? undefined : (list.find((m) => m.id === id) ?? null);
}

/** Draft passed between Create → Choose Design */
export const DRAFT_KEY = "afterglow.draft";
