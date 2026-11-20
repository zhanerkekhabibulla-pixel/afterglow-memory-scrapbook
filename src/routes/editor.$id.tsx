import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Shell, btn, btnGhost } from "@/components/afterglow/Shell";
import { ItemView } from "@/components/afterglow/PageCanvas";
import { moods } from "@/lib/afterglow/theme";
import { uid } from "@/lib/afterglow/layout";
import { saveMemory, useMemory } from "@/lib/afterglow/store";
import type { PageItem } from "@/lib/afterglow/types";

export const Route = createFileRoute("/editor/$id")({
  head: () => ({ meta: [
    { title: "Редактор альбома — AFTERGLOW" },
    { name: "description", content: "Перетаскивайте, масштабируйте и поворачивайте элементы разворота." },
    { property: "og:title", content: "Редактор альбома — AFTERGLOW" },
    { property: "og:description", content: "Редактируемые элементы страницы скрапбука." },
  ] }),
  component: Editor,
});

function Editor() {
  const { id } = Route.useParams();
  const m = useMemory(id);
  const [items, setItems] = useState<PageItem[]>([]);
  const [sel, setSel] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number } | null>(null);
  useEffect(() => { if (m) setItems(m.items); }, [m?.id]);
  if (!m) return <Shell title="Album Editor" back="/">{m === null ? "Не найдено" : "…"}</Shell>;

  const upd = (iid: string, p: Partial<PageItem>) => setItems((xs) => xs.map((x) => (x.id === iid ? { ...x, ...p } : x)));
  const cur = items.find((x) => x.id === sel);
  const maxZ = Math.max(0, ...items.map((x) => x.zIndex));

  const onDown = (e: React.PointerEvent, it: PageItem) => {
    e.preventDefault(); (e.target as Element).setPointerCapture(e.pointerId);
    setSel(it.id); drag.current = { id: it.id, sx: e.clientX, sy: e.clientY, ox: it.x, oy: it.y };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current; const r = ref.current?.getBoundingClientRect();
    if (!d || !r) return;
    upd(d.id, { x: d.ox + ((e.clientX - d.sx) / r.width) * 100, y: d.oy + ((e.clientY - d.sy) / r.height) * 100 });
  };

  return (
    <Shell title="Album Editor" back="/" action={<Link to="/album/$id" params={{ id }} className="text-sm">Вид</Link>}>
      <div ref={ref} onPointerMove={onMove} onPointerUp={() => (drag.current = null)} onClick={(e) => e.target === e.currentTarget && setSel(null)}
        className={`paper ${moods[m.mood].paperClass} relative aspect-[2/3] w-full touch-none overflow-hidden rounded-sm`}>
        {[...items].sort((a, b) => a.zIndex - b.zIndex).map((it) => (
          <div key={it.id} onPointerDown={(e) => onDown(e, it)}
            className={`absolute cursor-move ${sel === it.id ? "outline outline-2 outline-offset-2 outline-accent" : ""}`}
            style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${it.width}%`, height: `${it.height}%`, transform: `rotate(${it.rotation}deg)`, zIndex: it.zIndex }}>
            <div className="pointer-events-none h-full w-full"><ItemView item={it} /></div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {cur ? (<>
          <button className={btnGhost} onClick={() => upd(cur.id, { width: cur.width * 1.1, height: cur.height * 1.1 })}>＋</button>
          <button className={btnGhost} onClick={() => upd(cur.id, { width: cur.width * 0.9, height: cur.height * 0.9 })}>－</button>
          <button className={btnGhost} onClick={() => upd(cur.id, { rotation: cur.rotation - 5 })}>⟲</button>
          <button className={btnGhost} onClick={() => upd(cur.id, { rotation: cur.rotation + 5 })}>⟳</button>
          <button className={btnGhost} onClick={() => upd(cur.id, { zIndex: maxZ + 1 })}>Наверх</button>
          {(cur.type === "text" || cur.type === "sticker") && (
            <button className={btnGhost} onClick={() => { const t = prompt("Текст", cur.data.text); if (t !== null) upd(cur.id, { data: { ...cur.data, text: t } }); }}>Текст</button>
          )}
          <button className={btnGhost} onClick={() => { setItems((xs) => xs.filter((x) => x.id !== cur.id)); setSel(null); }}>Удалить</button>
        </>) : (<>
          <button className={btnGhost} onClick={() => setItems((xs) => [...xs, { id: uid(), type: "text", x: 10, y: 40, width: 60, height: 8, rotation: 0, zIndex: maxZ + 1, data: { text: "Подпись", variant: "body" } }])}>+ Текст</button>
          {["✿", "☁", "❦", "♡"].map((s) => (
            <button key={s} className={btnGhost} onClick={() => setItems((xs) => [...xs, { id: uid(), type: "sticker", x: 45, y: 45, width: 10, height: 7, rotation: 0, zIndex: maxZ + 1, data: { text: s } }])}>{s}</button>
          ))}
        </>)}
      </div>
      <button className={`${btn} mt-5 w-full`} onClick={() => saveMemory({ ...m, items })}>Сохранить</button>
    </Shell>
  );
}
