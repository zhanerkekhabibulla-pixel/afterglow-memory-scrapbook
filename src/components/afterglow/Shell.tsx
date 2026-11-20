import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Shell({ title, back, children, action }: { title: string; back?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md px-5 pb-16 pt-6">
      <header className="mb-6 flex items-center justify-between gap-3 border-b border-primary/30 pb-3">
        {back ? <Link to={back} className="text-sm text-muted-foreground">← Назад</Link> : <span className="text-xs tracking-[0.3em] text-muted-foreground">AFTERGLOW</span>}
        <h1 className="truncate font-serif text-lg">{title}</h1>
        <div className="min-w-12 text-right">{action}</div>
      </header>
      <main className="rise">{children}</main>
    </div>
  );
}

export const btn = "inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2.5 font-sans text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50";
export const btnGhost = "inline-flex items-center justify-center rounded-sm border border-primary/40 px-3 py-2 font-sans text-foreground transition hover:bg-muted";
export const field = "w-full rounded-sm border border-input bg-card px-3 py-2 font-sans outline-none focus:border-ring";
