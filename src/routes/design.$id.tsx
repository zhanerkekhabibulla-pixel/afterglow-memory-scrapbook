import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, btn, field } from "@/components/afterglow/Shell";
import { localSuggest } from "@/lib/afterglow/ai";
import { buildItems } from "@/lib/afterglow/layout";
import { moods, templates } from "@/lib/afterglow/theme";
import { saveMemory, useMemory } from "@/lib/afterglow/store";
import type { Mood, TemplateId } from "@/lib/afterglow/types";

export const Route = createFileRoute("/design/$id")({
  head: () => ({ meta: [
    { title: "Выбор дизайна — AFTERGLOW" },
    { name: "description", content: "Шаблон, описание или пустой лист — выберите способ оформления." },
    { property: "og:title", content: "Выбор дизайна — AFTERGLOW" },
    { property: "og:description", content: "Сетки-шаблоны разворотов скрапбука." },
  ] }),
  component: Design,
});

function Design() {
  const { id } = Route.useParams();
  const m = useMemory(id);
  const nav = useNavigate();
  const [method, setMethod] = useState<"template" | "describe" | "scratch">("template");
  const [tpl, setTpl] = useState<TemplateId | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [describe, setDescribe] = useState("");
  if (!m) return <Shell title="Choose Design" back="/">{m === null ? "Не найдено" : "…"}</Shell>;

  const ai = localSuggest({ ...m, describe });
  const go = () => {
    const s = { ...ai, template: tpl ?? ai.template, mood: mood ?? ai.mood };
    saveMemory({ ...m, mood: s.mood, template: s.template, designMethod: method, items: buildItems(m, s, method === "scratch") });
    nav({ to: "/editor/$id", params: { id } });
  };

  return (
    <Shell title="Choose Design" back="/">
      <div className="mb-5 grid grid-cols-3 gap-2 text-sm">
        {([["template", "Ready-made Templates"], ["describe", "Describe Your Design"], ["scratch", "Create From Scratch"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setMethod(k)} className={`rounded-sm border p-2 ${method === k ? "border-primary bg-primary text-primary-foreground" : "border-primary/30"}`}>{l}</button>
        ))}
      </div>

      {method === "template" && (
        <div className="grid grid-cols-2 gap-3">
          {templates.map((t) => (
            <button key={t.id} onClick={() => setTpl(t.id)} className={`rounded-sm border-2 p-2 text-left ${(tpl ?? ai.template) === t.id ? "border-primary" : "border-transparent"}`}>
              <div className="paper relative aspect-[2/3]">
                {t.slots.map((s, i) => <div key={i} className="absolute bg-secondary/60" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.width}%`, height: `${s.height}%`, transform: `rotate(${s.rotation ?? 0}deg)` }} />)}
              </div>
              <div className="mt-1 text-sm">{t.name}{ai.template === t.id && <span className="ml-1 text-accent">· AI</span>}</div>
            </button>
          ))}
        </div>
      )}
      {method === "describe" && (
        <textarea className={field} rows={4} placeholder="Например: спокойно, много воздуха, одно большое фото моря" value={describe} onChange={(e) => setDescribe(e.target.value)} />
      )}
      {method === "scratch" && <p className="text-muted-foreground">Фото будут разложены свободно — расставите всё сами в редакторе.</p>}

      <h2 className="mb-2 mt-6 font-serif">Настроение</h2>
      <div className="flex gap-2">
        {(Object.keys(moods) as Mood[]).map((k) => (
          <button key={k} onClick={() => setMood(k)} className={`flex-1 rounded-sm border p-2 text-sm ${moods[k].paperClass} ${(mood ?? ai.mood) === k ? "border-primary" : "border-primary/20"}`}>
            {moods[k].emoji} {moods[k].label}
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-sm bg-muted p-3 text-sm text-muted-foreground">
        <div className="mb-1 flex gap-1">{ai.accentColors.map((c) => <span key={c} className="h-4 w-4 rounded-full border border-primary/20" style={{ background: c }} />)}</div>
        {ai.reasoning}
      </div>
      <button className={`${btn} mt-6 w-full`} onClick={go}>Открыть редактор →</button>
    </Shell>
  );
}
