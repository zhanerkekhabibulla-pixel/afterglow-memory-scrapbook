import { Link } from "@tanstack/react-router";
import { moods } from "@/lib/afterglow/theme";
import type { Memory, PageItem } from "@/lib/afterglow/types";
import { MusicCard } from "./MusicCard";

export function ItemView({ item }: { item: PageItem }) {
  if (item.type === "photo")
    return (
      <div className="photo-frame tape relative h-full w-full">
        <img src={item.data.src} alt={item.data.caption ?? ""} className="h-full w-full object-cover" draggable={false} />
      </div>
    );
  if (item.type === "music" && item.data.music) return <MusicCard music={item.data.music} compact />;
  if (item.type === "sticker") return <div className="flex h-full w-full items-center justify-center text-2xl text-accent">{item.data.text}</div>;
  const v = item.data.variant;
  return (
    <div className={v === "title" ? "font-serif text-xl leading-tight text-foreground" : v === "tag" ? "inline-block bg-accent px-2 py-0.5 font-sans text-sm text-accent-foreground" : "font-sans text-sm text-foreground"}>
      {item.data.text}
    </div>
  );
}

export function PageCanvas({ memory, linkPhotos = false }: { memory: Memory; linkPhotos?: boolean }) {
  return (
    <div className={`paper ${moods[memory.mood].paperClass} relative mx-auto aspect-[2/3] w-full overflow-hidden rounded-sm`}>
      {[...memory.items].sort((a, b) => a.zIndex - b.zIndex).map((it) => {
        const style = { left: `${it.x}%`, top: `${it.y}%`, width: `${it.width}%`, height: `${it.height}%`, transform: `rotate(${it.rotation}deg)`, zIndex: it.zIndex };
        return linkPhotos && it.type === "photo" ? (
          <Link key={it.id} to="/photo/$id/$itemId" params={{ id: memory.id, itemId: it.id }} className="absolute transition-transform hover:scale-[1.02]" style={style}>
            <ItemView item={it} />
          </Link>
        ) : (
          <div key={it.id} className="absolute" style={style}><ItemView item={it} /></div>
        );
      })}
    </div>
  );
}
