import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { AskAgent } from "./AskAgent";
import { Button } from "@/components/ui/button";

export function AssistantSolusenIA() {
  const [open, setOpen] = useState(false);
  return (
    <div id="assistant" className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[calc(100vw-2rem)] max-w-md rounded-lg border border-border bg-card p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-bold"><Sparkles className="h-4 w-4 text-secondary" />Assistant IA Solusen</p>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Fermer">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AskAgent compact />
        </div>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          data-open-assistant
          className="h-12 rounded-full px-4 shadow-lg"
        >
          <Sparkles /><span className="hidden sm:inline">Assistant IA</span>
        </Button>
      )}
    </div>
  );
}
