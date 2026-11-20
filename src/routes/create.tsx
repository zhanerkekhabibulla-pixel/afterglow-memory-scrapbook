import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, btn, btnGhost, field } from "@/components/afterglow/Shell";
import { MusicCard, detectSource } from "@/components/afterglow/MusicCard";
import { demoTracks } from "@/lib/afterglow/theme";
import { saveMemory } from "@/lib/afterglow/store";
import { uid } from "@/lib/afterglow/layout";
import type { MusicAttachment } from "@/lib/afterglow/types";

export const Route = createFileRoute("/create")({
  head: () => ({ meta: [
    { title: "Создать воспоминание — AFTERGLOW" },
    { name: "description", content: "Добавьте фото, историю и музыку к новому воспоминанию." },
    { property: "og:title", content: "Создать воспоминание — AFTERGLOW" },
    { property: "og:description", content: "Фото, история и музыка в одном развороте." },
  ] }),
  component: Create,
});

function Create() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [story, setStory] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState<{ src: string; note: string }[]>([]);
  const [music, setMusic] = useState<MusicAttachment | undefined>();
  const [link, setLink] = useState("");

  const onFiles = (files: FileList | null) => {
    Array.from(files ?? []).slice(0, 4 - photos.length).forEach((f) => {
      const r = new FileReader();
      r.onload = () => {
        const im = new Image();
        im.onload = () => { // downscale to keep storage small
          const c = document.createElement("canvas"); const s = Math.min(1, 700 / Math.max(im.width, im.height));
          c.width = im.width * s; c.height = im.height * s; c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height);
          setPhotos((p) => [...p, { src: c.toDataURL("image/jpeg", 0.8), note: "" }]);
        };
        im.src = r.result as string;
      };
      r.readAsDataURL(f);
    });
  };

  const next = () => {
    const id = uid();
    saveMemory({ id, title, date, story, details, photos, music, mood: "nostalgic", template: "single", designMethod: "template", items: [], createdAt: Date.now() });
    nav({ to: "/design/$id", params: { id } });
  };

  return (
    <Shell title="Create Memory" back="/">
      <div className="space-y-4">
        <input className={`${field} font-serif text-lg`} placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className={field} placeholder="Когда? (напр. Лето 2010)" value={date} onChange={(e) => setDate(e.target.value)} />
        <textarea className={field} rows={4} placeholder="Ваша история…" value={story} onChange={(e) => setStory(e.target.value)} />
        <input className={field} placeholder="Детали: место, люди, запахи" value={details} onChange={(e) => setDetails(e.target.value)} />

        <section>
          <h2 className="mb-2 font-serif">Фото (до 4)</h2>
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p, i) => (
              <div key={i} className="photo-frame !pb-2">
                <img src={p.src} alt="" className="aspect-square w-full object-cover" />
                <input className="mt-2 w-full bg-transparent text-sm outline-none" placeholder="Заметка на обороте" value={p.note}
                  onChange={(e) => setPhotos((ps) => ps.map((x, j) => (j === i ? { ...x, note: e.target.value } : x)))} />
              </div>
            ))}
            {photos.length < 4 && (
              <label className="flex aspect-square cursor-pointer items-center justify-center rounded-sm border-2 border-dashed border-primary/30 text-muted-foreground">
                + фото<input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
              </label>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-2 font-serif">Музыка</h2>
          {music ? (
            <div className="space-y-2"><div className="h-16"><MusicCard music={music} /></div><button className={btnGhost} onClick={() => setMusic(undefined)}>Убрать</button></div>
          ) : (
            <>
              <div className="flex gap-2">
                <input className={field} placeholder="Ссылка Spotify / Apple / YouTube Music" value={link} onChange={(e) => setLink(e.target.value)} />
                <button className={btnGhost} disabled={!link} onClick={() => setMusic({ title: "Мой трек", artist: "по ссылке", source: detectSource(link), url: link })}>OK</button>
              </div>
              <div className="mt-3 space-y-2">
                {demoTracks.map((t) => (
                  <button key={t.title} onClick={() => setMusic(t)} className="block h-14 w-full text-left"><MusicCard music={t} /></button>
                ))}
              </div>
            </>
          )}
        </section>

        <button className={`${btn} w-full`} disabled={!title && !story && photos.length === 0} onClick={next}>Далее: дизайн →</button>
      </div>
    </Shell>
  );
}
