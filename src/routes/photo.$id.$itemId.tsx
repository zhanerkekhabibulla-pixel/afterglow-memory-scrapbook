import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/afterglow/Shell";
import { useMemory } from "@/lib/afterglow/store";

export const Route = createFileRoute("/photo/$id/$itemId")({
  head: () => ({ meta: [
    { title: "Фото — AFTERGLOW" },
    { name: "description", content: "Фото и заметка на его обороте." },
    { property: "og:title", content: "Фото — AFTERGLOW" },
    { property: "og:description", content: "Переверните фото, чтобы прочитать заметку." },
  ] }),
  component: Photo,
});

function Photo() {
  const { id, itemId } = Route.useParams();
  const m = useMemory(id);
  const [back, setBack] = useState(false);
  const it = m?.items.find((x) => x.id === itemId);
  if (!m || !it) return <Shell title="Photo" back="/">{m === undefined ? "…" : "Не найдено"}</Shell>;
  return (
    <Shell title="Photo" back={`/album/${id}`}>
      <button onClick={() => setBack((b) => !b)} className="relative block aspect-[3/4] w-full">
        <div className={`photo-frame tape absolute inset-0 transition-opacity duration-300 ${back ? "opacity-0" : "opacity-100"}`}>
          <img src={it.data.src} alt="" className="h-full w-full object-cover" />
        </div>
        <div className={`paper absolute inset-0 flex flex-col justify-center p-8 text-left transition-opacity duration-300 ${back ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <div className="mb-4 text-xs tracking-widest text-muted-foreground">{m.date}</div>
          <p className="font-serif text-xl italic leading-relaxed">{it.data.caption || "Заметки пока нет"}</p>
        </div>
      </button>
      <p className="mt-4 text-center text-sm text-muted-foreground">Нажмите, чтобы {back ? "увидеть фото" : "прочитать оборот"}</p>
    </Shell>
  );
}
