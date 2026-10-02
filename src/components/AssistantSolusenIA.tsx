import { useState } from "react";
import { X } from "lucide-react";
import { AskAgent } from "./AskAgent";

export function AssistantSolusenIA() {
  const [open, setOpen] = useState(false);
  return (
    <div id="assistant" className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-border bg-card p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">🎓 Assistant IA Solusen</p>
            <button onClick={() => setOpen(false)} aria-label="Fermer" className="rounded-lg p-1 hover:bg-accent">
              <X className="h-4 w-4" />
            </button>
          </div>
          <AskAgent compact />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          data-open-assistant
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          🎓 <span className="hidden sm:inline">Assistant IA</span> ✨
        </button>
      )}
    </div>
  );
}
