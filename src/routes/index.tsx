import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, btn } from "@/components/afterglow/Shell";
import { PageCanvas } from "@/components/afterglow/PageCanvas";
import { moods } from "@/lib/afterglow/theme";
import { useMemories } from "@/lib/afterglow/store";
import { useState } from "react";
import type { Mood } from "@/lib/afterglow/types";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "AFTERGLOW — архив воспоминаний" },
    { name: "description", content: "A Digital Scrapbook of Your Life: архив ваших воспоминаний-разворотов." },
    { property: "og:title", content: "AFTERGLOW — архив воспоминаний" },
    { property: "og:description", content: "Цифровой скрапбук вашей жизни." },
  ] }),
  component: Archive,
});

function Archive() {
  const list = useMemories();
  const [f, setF] = useState<Mood | "all">("all");
  const shown = (list ?? []).filter((m) => f === "all" || m.mood === f);
  return (
    <Shell title="Archive" action={<Link to="/create" className="text-2xl">+</Link>}>
      <p className="mb-1 font-serif text-3xl leading-tight">A Digital Scrapbook<br /><em className="text-muted-foreground">of Your Life</em></p>
      <div className="my-5 flex flex-wrap gap-2">
        {(["all", "nostalgic", "joyful", "dreamy"] as const).map((k) => (
          <button key={k} onClick={() => setF(k)} className={`rounded-full border px-3 py-1 text-sm ${f === k ? "border-primary bg-primary text-primary-foreground" : "border-primary/30"}`}>
            {k === "all" ? "Все" : `${moods[k].emoji} ${moods[k].label}`}
          </button>
        ))}
      </div>
      {list === null ? <p className="text-muted-foreground">Загрузка…</p> : (
        <div className="grid grid-cols-2 gap-4">
          {shown.map((m) => (
            <Link key={m.id} to="/album/$id" params={{ id: m.id }} className="group">
              <div className="pointer-events-none transition group-hover:-rotate-1"><PageCanvas memory={m} /></div>
              <div className="mt-2 font-serif text-sm">{m.title}</div>
              <div className="text-xs text-muted-foreground">{m.date} · {moods[m.mood].label}</div>
            </Link>
          ))}
        </div>
      )}
      <Link to="/create" className={`${btn} mt-8 w-full`}>Создать воспоминание</Link>
    </Shell>
  );
}
