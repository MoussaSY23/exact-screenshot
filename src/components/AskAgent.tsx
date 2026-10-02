import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles } from "lucide-react";
import { askDify } from "@/lib/dify.functions";

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    const t = line.trim();
    const bullet = /^[-*•]\s+/.test(t);
    const heading = /^#{1,4}\s+/.test(t);
    const clean = t.replace(/^[-*•]\s+/, "").replace(/^#{1,4}\s+/, "");
    const parts = clean.split(/\*\*(.+?)\*\*/g).map((p, j) => (j % 2 ? <strong key={j}>{p}</strong> : p));
    if (!t) return <div key={i} className="h-2" />;
    if (heading) return <p key={i} className="mt-2 font-semibold text-foreground">{parts}</p>;
    if (bullet) return <li key={i} className="ml-5 list-disc">{parts}</li>;
    return <p key={i}>{parts}</p>;
  });
}

export function AskAgent({ compact = false }: { compact?: boolean }) {
  const ask = useServerFn(askDify);
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim() || loading) return;
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const r = await ask({ data: { query: q } });
      if (r.error) setError(r.error);
      else setAnswer(r.answer || "Aucune réponse reçue.");
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? "" : "rounded-2xl border border-border bg-card p-5 shadow-md md:p-6"}>
      {!compact && (
        <h2 className="text-lg font-bold text-foreground">🎓 Assistant IA Solusen (Vérification & Conseils)</h2>
      )}
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={1000}
          placeholder="Ex: Quels stages tech ou marketing sont ouverts à Dakar ?"
          className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        <button
          disabled={loading || !q.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Interroger l'agent ✨
        </button>
      </form>
      {(answer || error || loading) && (
        <div className="mt-4 max-h-80 overflow-y-auto rounded-xl border border-border bg-muted p-4 text-sm leading-relaxed text-foreground">
          {loading && <p className="text-muted-foreground">L'agent analyse votre question…</p>}
          {error && <p className="text-destructive">⚠️ {error}</p>}
          {answer && <div className="space-y-1">{renderMarkdown(answer)}</div>}
        </div>
      )}
    </div>
  );
}
