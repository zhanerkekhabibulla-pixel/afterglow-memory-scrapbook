import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shell, btnGhost } from "@/components/afterglow/Shell";
import { PageCanvas } from "@/components/afterglow/PageCanvas";
import { MusicCard } from "@/components/afterglow/MusicCard";
import { moods } from "@/lib/afterglow/theme";
import { deleteMemory, useMemory } from "@/lib/afterglow/store";

export const Route = createFileRoute("/album/$id")({
  head: () => ({ meta: [
    { title: "Альбом — AFTERGLOW" },
    { name: "description", content: "Разворот воспоминания с фото, историей и музыкой." },
    { property: "og:title", content: "Альбом — AFTERGLOW" },
    { property: "og:description", content: "Страница цифрового скрапбука." },
  ] }),
  component: Album,
});

function Album() {
  const { id } = Route.useParams();
  const m = useMemory(id);
  const nav = useNavigate();
  if (!m) return <Shell title="Album" back="/">{m === null ? "Не найдено" : "…"}</Shell>;
  return (
    <Shell title={m.title || "Album"} back="/" action={<Link to="/editor/$id" params={{ id }} className="text-sm">Править</Link>}>
      <PageCanvas memory={m} linkPhotos />
      <p className="mt-2 text-center text-xs text-muted-foreground">Нажмите на фото, чтобы перевернуть его</p>
      <div className="mt-6 space-y-3">
        <div className="text-xs tracking-widest text-muted-foreground">{m.date} · {moods[m.mood].label.toUpperCase()}</div>
        {m.story && <p className="font-serif leading-relaxed">{m.story}</p>}
        {m.details && <p className="text-muted-foreground">{m.details}</p>}
        {m.music && <div className="h-16"><MusicCard music={m.music} /></div>}
        <button className={btnGhost} onClick={() => { if (confirm("Удалить?")) { deleteMemory(id); nav({ to: "/" }); } }}>Удалить</button>
      </div>
    </Shell>
  );
}
