import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/offres")({
  head: () => ({
    meta: [
      { title: "Offres de stages & formations — Solusen" },
      {
        name: "description",
        content:
          "Parcourez les stages et formations certifiés à Dakar : Plateau, Almadies, Pikine, Parcelles Assainies. Offres vérifiées par IA, sans arnaque.",
      },
      { property: "og:title", content: "Offres de stages & formations — Solusen" },
      {
        property: "og:description",
        content:
          "Stages et formations certifiés à Dakar, filtrables par type et par zone. Chaque offre est vérifiée avant publication.",
      },
    ],
  }),
  component: Offres,
});

type Offer = {
  title: string;
  company: string;
  zone: string;
  compensation: string;
  type: "Stage" | "Formation";
  status: "Certifiée" | "Vérification en cours";
};

const OFFERS: Offer[] = [
  {
    title: "Assistant Marketing Digital",
    company: "Teranga Tech",
    zone: "Almadies",
    compensation: "150 000 FCFA/mois",
    type: "Stage",
    status: "Certifiée",
  },
  {
    title: "Développeur Web Junior",
    company: "Dakar Innovation Lab",
    zone: "Dakar Plateau",
    compensation: "180 000 FCFA/mois",
    type: "Stage",
    status: "Certifiée",
  },
  {
    title: "Certification Data Analyst",
    company: "Université Numérique",
    zone: "Dakar Plateau",
    compensation: "Gratuit",
    type: "Formation",
    status: "Certifiée",
  },
  {
    title: "Stagiaire Comptabilité",
    company: "Groupe Ndiaye & Co",
    zone: "Pikine",
    compensation: "100 000 FCFA/mois",
    type: "Stage",
    status: "Certifiée",
  },
  {
    title: "Formation Design UX/UI",
    company: "Baobab Digital Academy",
    zone: "Parcelles Assainies",
    compensation: "50 000 FCFA",
    type: "Formation",
    status: "Certifiée",
  },
  {
    title: "Assistant Ressources Humaines",
    company: "Sonatel Partner",
    zone: "Mermoz",
    compensation: "125 000 FCFA/mois",
    type: "Stage",
    status: "Certifiée",
  },
];

const TYPES = ["Tous", "Stage", "Formation"] as const;
const ZONES = ["Toutes zones", "Dakar Plateau", "Almadies", "Pikine", "Parcelles Assainies"] as const;

function Offres() {
  const [type, setType] = useState<(typeof TYPES)[number]>("Tous");
  const [zone, setZone] = useState<(typeof ZONES)[number]>("Toutes zones");

  const filtered = useMemo(
    () =>
      OFFERS.filter(
        (offer) =>
          (type === "Tous" || offer.type === type) &&
          (zone === "Toutes zones" || offer.zone === zone),
      ),
    [type, zone],
  );

  return (
    <div className="bg-secondary/30">
      <section className="hero-mesh border-b border-border">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Offres vérifiées
          </span>
          <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            Stages & formations à Dakar
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Chaque offre affichée ici a été contrôlée : entreprise identifiée, conditions réelles,
            gratification annoncée. Le badge <span className="font-semibold text-certified">✓ Offre Vérifiée IA</span> vous protège des arnaques.
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-page flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Type
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={
                    type === t
                      ? "rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors"
                      : "rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="zone-filter"
              className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Zone
            </label>
            <select
              id="zone-filter"
              value={zone}
              onChange={(e) => setZone(e.target.value as (typeof ZONES)[number])}
              className="w-full rounded-full border border-input bg-card px-4 py-1.5 text-xs font-medium text-foreground outline-none transition-colors focus:border-ring md:w-auto"
            >
              {ZONES.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs text-muted-foreground md:ml-auto">
            {filtered.length} offre{filtered.length > 1 ? "s" : ""} · {type} · {zone}
          </span>
        </div>
      </section>

      {/* Liste des offres */}
      <section className="container-page py-10 md:py-14">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <p className="text-lg font-semibold text-foreground">Aucune offre ne correspond</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Essayez une autre zone ou un autre type d'offre.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((offer) => (
              <article
                key={offer.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={
                      offer.type === "Stage"
                        ? "rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary"
                        : "rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground"
                    }
                  >
                    {offer.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-certified-soft px-3 py-1 text-xs font-bold text-certified">
                    <span aria-hidden>✓</span> Offre Vérifiée IA
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold leading-snug text-foreground">
                  {offer.title}
                </h2>
                <p className="mt-1.5 text-sm font-medium text-muted-foreground">{offer.company}</p>
                <dl className="mt-5 space-y-2.5 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">📍 Zone</dt>
                    <dd className="font-semibold text-foreground">{offer.zone}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">
                      {offer.type === "Stage" ? "💰 Gratification" : "💰 Prix"}
                    </dt>
                    <dd className="font-semibold text-foreground">{offer.compensation}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">🛡️ Statut</dt>
                    <dd className="font-semibold text-certified">{offer.status}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
