import type { MusicAttachment } from "@/lib/afterglow/types";

const label = { spotify: "Spotify", apple: "Apple Music", youtube: "YouTube Music", other: "Ссылка" };

export function MusicCard({ music, compact }: { music: MusicAttachment; compact?: boolean }) {
  return (
    <a href={music.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
      className={`flex h-full w-full items-center gap-3 rounded-sm border border-primary/30 bg-card/90 ${compact ? "p-2" : "p-3"}`}>
      <div className="flex aspect-square h-full max-h-12 items-center justify-center rounded-full bg-primary text-primary-foreground">♪</div>
      <div className="min-w-0">
        <div className="truncate font-serif text-sm text-foreground">{music.title}</div>
        <div className="truncate text-xs text-muted-foreground">{music.artist} · {label[music.source]}</div>
      </div>
    </a>
  );
}

export function detectSource(url: string): MusicAttachment["source"] {
  if (url.includes("spotify")) return "spotify";
  if (url.includes("apple")) return "apple";
  if (url.includes("youtu")) return "youtube";
  return "other";
}
