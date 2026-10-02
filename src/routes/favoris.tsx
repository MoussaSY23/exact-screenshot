import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Search } from "lucide-react";
import { useState } from "react";
import { ApplyDialog } from "@/components/ApplyDialog";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/favorites";
import { OFFERS, type Offer } from "@/lib/offers";

export const Route = createFileRoute("/favoris")({
  head: () => ({
    meta: [
      { title: "Mes offres favorites — Solusen" },
      { name: "description", content: "Retrouvez les stages, alternances et formations certifiés que vous avez enregistrés sur Solusen." },
      { property: "og:title", content: "Mes offres favorites — Solusen" },
      { property: "og:description", content: "Votre sélection personnelle d'opportunités certifiées à Dakar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Favoris,
});

function Favoris() {
  const { favorites } = useFavorites();
  const [applying, setApplying] = useState<Offer | null>(null);
  const offers = OFFERS.filter((offer) => favorites.includes(offer.id));

  return (
    <div className="min-h-[70vh]">
      <section className="border-b border-border bg-card">
        <div className="container-page py-12 md:py-16">
          <span className="section-label"><Heart className="h-4 w-4" /> Ma sélection</span>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">Mes favoris</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Gardez vos meilleures opportunités à portée de main et postulez quand vous êtes prêt.</p>
        </div>
      </section>
      <section className="container-page py-10 md:py-14">
        {offers.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => <OfferCard key={offer.id} offer={offer} action="Postuler" onAction={() => setApplying(offer)} />)}
          </div>
        ) : (
          <div className="mx-auto max-w-xl border border-dashed border-border bg-card px-6 py-14 text-center shadow-sm">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary"><Heart className="h-5 w-5" /></span>
            <h2 className="mt-5 text-xl font-bold">Votre sélection est vide</h2>
            <p className="mt-2 text-sm text-muted-foreground">Enregistrez une offre avec le cœur pour la retrouver ici.</p>
            <Button asChild className="mt-6 h-11 rounded-lg px-5"><Link to="/offres"><Search />Explorer les offres</Link></Button>
          </div>
        )}
      </section>
      <ApplyDialog offer={applying} onClose={() => setApplying(null)} />
    </div>
  );
}
