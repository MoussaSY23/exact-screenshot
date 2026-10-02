import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
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

const TYPES = ["Tous", "Stage", "Alternance", "Formation certifiante"] as const;
const ZONES = ["Toutes zones", "Dakar Plateau", "Almadies", "Point E", "Mermoz", "Pikine"] as const;
const LEVELS = ["Tous niveaux", "Licence", "Master"] as const;

const sel = "rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-ring";

function Offres() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("Tous");
  const [zone, setZone] = useState<string>("Toutes zones");
  const [level, setLevel] = useState<string>("Tous niveaux");
  const [applying, setApplying] = useState<Offer | null>(null);

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return OFFERS.filter(
      (o) =>
        (!s || `${o.title} ${o.company} ${o.tag}`.toLowerCase().includes(s)) &&
        (type === "Tous" || o.type === type) &&
        (zone === "Toutes zones" || o.zone === zone) &&
        (level === "Tous niveaux" || o.level === level),
    );
  }, [q, type, zone, level]);

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
        <div className="container-page grid gap-3 py-4 md:grid-cols-[1fr_auto_auto_auto]">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Métier, entreprise…" className={`${sel} w-full pl-9`} />
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={sel} aria-label="Type">{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
          <select value={zone} onChange={(e) => setZone(e.target.value)} className={sel} aria-label="Zone">{ZONES.map((t) => <option key={t}>{t}</option>)}</select>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className={sel} aria-label="Niveau">{LEVELS.map((t) => <option key={t}>{t}</option>)}</select>
        </div>
      </section>

      <section className="container-page py-10">
        <p className="mb-5 text-sm text-muted-foreground">{list.length} opportunité{list.length > 1 ? "s" : ""}</p>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center text-muted-foreground">Aucune offre ne correspond à ces filtres.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((o) => <OfferCard key={o.id} offer={o} action="Postuler directement" onAction={() => setApplying(o)} />)}
          </div>
        )}
      </section>
      <ApplyDialog offer={applying} onClose={() => setApplying(null)} />
    </div>
  );
}
