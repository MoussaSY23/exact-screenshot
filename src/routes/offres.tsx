import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { AskAgent } from "@/components/AskAgent";
import { OfferCard } from "@/components/OfferCard";
import { ApplyDialog } from "@/components/ApplyDialog";
import { OFFERS, type Offer } from "@/lib/offers";

export const Route = createFileRoute("/offres")({
  head: () => ({
    meta: [
      { title: "Offres certifiées & Assistant IA — Solusen" },
      { name: "description", content: "Stages, alternances et formations certifiantes à Dakar, filtrables par zone et niveau, avec un assistant IA d'orientation." },
      { property: "og:title", content: "Offres certifiées & Assistant IA — Solusen" },
      { property: "og:description", content: "Wave, GAINDÉ 2000, Sonatel, BDO… des offres vérifiées et un agent IA pour vous conseiller." },
    ],
  }),
  component: Offres,
});

const TYPES = ["Tous", "Stage", "Formation"] as const;
const ZONES = ["Toutes", "Plateau", "Point E", "Almadies", "Mermoz", "Zone Portuaire"] as const;
const GRATIFICATION = ["Tous", ">= 100 000 FCFA", ">= 150 000 FCFA"] as const;

function Offres() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("Tous");
  const [zone, setZone] = useState<string>("Toutes");
  const [gratification, setGratification] = useState<string>("Tous");
  const [applying, setApplying] = useState<Offer | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem("solusen_favoris");
      if (stored) setFavorites(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  const toggleFavorite = (offerId: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(offerId)) newFavs.delete(offerId);
    else newFavs.add(offerId);
    setFavorites(newFavs);
    localStorage.setItem("solusen_favoris", JSON.stringify([...newFavs]));
  };

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    const minGrat = gratification === "Tous" ? 0 : gratification === ">= 100 000 FCFA" ? 100000 : 150000;
    return OFFERS.filter(
      (o) =>
        (!s || `${o.title} ${o.company} ${o.tag}`.toLowerCase().includes(s)) &&
        (type === "Tous" || o.type === type) &&
        (zone === "Toutes" || o.zone.includes(zone)) &&
        (o.payNum >= minGrat || o.payNum === 0),
    );
  }, [q, type, zone, gratification]);

  return (
    <div>
      <section className="hero-mesh border-b border-border">
        <div className="container-page py-10 md:py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Offres & Assistant IA</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Toutes les opportunités ci-dessous sont certifiées Solusen. Posez vos questions à l'agent pour être orienté.</p>
          <div className="mt-8"><AskAgent /></div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-page space-y-4 py-4">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Métier, entreprise, compétences…" className="w-full rounded-xl border border-input bg-card px-4 py-3 pl-10 text-sm outline-none focus:border-ring" />
          </label>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" /> Zone :
            </div>
            {ZONES.map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  zone === z
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                {z}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MapPin className="h-4 w-4" /> Type :
            </div>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  type === t
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              💰 Gratification :
            </div>
            {GRATIFICATION.map((g) => (
              <button
                key={g}
                onClick={() => setGratification(g)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  gratification === g
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <p className="mb-5 text-sm font-semibold text-foreground">{list.length} offre{list.length > 1 ? "s" : ""} certifiée{list.length > 1 ? "s" : ""} trouvée{list.length > 1 ? "s" : ""}</p>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center text-muted-foreground">Aucune offre ne correspond à ces filtres.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((o) => (
              <OfferCard 
                key={o.id} 
                offer={o} 
                action="Postuler directement" 
                onAction={() => setApplying(o)}
                isFavorite={favorites.has(o.id)}
                onToggleFavorite={() => toggleFavorite(o.id)}
              />
            ))}
          </div>
        )}
      </section>
      <ApplyDialog offer={applying} onClose={() => setApplying(null)} />
    </div>
  );
}
