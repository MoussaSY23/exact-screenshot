import { useState } from "react";

export function AssistantSolusenIA() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("https://api.dify.ai/v1/workflows/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer app-X2YxY1LmzaotAoNZHmkylj6p",
        },
        body: JSON.stringify({
          inputs: { query: query },
          response_mode: "blocking",
          user: "etudiant-" + Date.now(),
        }),
      });

      if (!res.ok) {
        throw new Error(`Erreur API: ${res.status}`);
      }

      const data = await res.json();
      
      // Extraction de la réponse selon la structure Dify
      const answer = data.outputs?.text || data.outputs?.answer || data.data?.outputs?.text || JSON.stringify(data);
      setResponse(answer);
    } catch (err) {
      setError("Une erreur est survenue lors de la communication avec l'assistant. Veuillez réessayer.");
      console.error("Erreur Dify:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
        >
          <span className="text-lg">🎓</span>
          <span className="hidden sm:inline">Assistant IA Solusen</span>
          <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">✨</span>
        </button>
      ) : (
        <div className="w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-border bg-card shadow-2xl sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-primary/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎓</span>
              <div>
                <h3 className="text-sm font-bold text-foreground">Assistant IA Solusen</h3>
                <p className="text-xs text-muted-foreground">Stages & Orientation</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Response Area */}
            {(response || error || isLoading) && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4">
                {isLoading && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span>L'IA réfléchit...</span>
                  </div>
                )}
                {error && (
                  <div className="text-sm text-red-600">
                    <span className="font-semibold">⚠️ Erreur :</span> {error}
                  </div>
                )}
                {response && !isLoading && (
                  <div className="text-sm leading-relaxed text-foreground">
                    <div className="mb-2 font-semibold text-green-700">✓ Réponse IA :</div>
                    <div className="whitespace-pre-wrap">{response}</div>
                  </div>
                )}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Posez une question à l'agent (ex: stages tech ou finance à Dakar)..."
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Traitement en cours..." : "Consulter l'agent ✨"}
              </button>
            </form>

            {/* Helper Text */}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              L'assistant vous aide à trouver des stages et formations certifiés à Dakar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
