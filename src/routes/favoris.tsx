import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Bookmark, Heart, ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { OFFERS, type Offer } from "@/lib/offers";

export const Route = createFileRoute("/favoris")({
  head: () => ({
    meta: [
      { title: "Mes Favoris — Solusen" },
      { name: "description", content: "Gérez vos offres favorites et suivez vos candidatures avec un pipeline Kanban." },
    ],
  }),
  component: Favoris,
});

type CandidatureStatus = "to_apply" | "sent" | "interview";

function Favoris() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [statuses, setStatuses] = useState<Record<string, CandidatureStatus>>({});

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("solusen_favoris");
      const storedStatuses = localStorage.getItem("solusen_candidatures_status");
      if (storedFavs) setFavorites(new Set(JSON.parse(storedFavs)));
      if (storedStatuses) setStatuses(JSON.parse(storedStatuses));
    } catch {}
  }, []);

  const toggleFavorite = (offerId: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(offerId)) {
      newFavs.delete(offerId);
      const newStatuses = { ...statuses };
      delete newStatuses[offerId];
      setStatuses(newStatuses);
      localStorage.setItem("solusen_candidatures_status", JSON.stringify(newStatuses));
    } else {
      newFavs.add(offerId);
      setStatuses((prev) => ({ ...prev, [offerId]: "to_apply" }));
      localStorage.setItem("solusen_candidatures_status", JSON.stringify({ ...statuses, [offerId]: "to_apply" }));
    }
    setFavorites(newFavs);
    localStorage.setItem("solusen_favoris", JSON.stringify([...newFavs]));
  };

  const updateStatus = (offerId: string, newStatus: CandidatureStatus) => {
    const newStatuses = { ...statuses, [offerId]: newStatus };
    setStatuses(newStatuses);
    localStorage.setItem("solusen_candidatures_status", JSON.stringify(newStatuses));
  };

  const favoriteOffers = OFFERS.filter((o) => favorites.has(o.id));

  const columns = [
    { id: "to_apply" as CandidatureStatus, title: "À postuler", color: "bg-primary-soft text-primary" },
    { id: "sent" as CandidatureStatus, title: "Candidature envoyée", color: "bg-certified-soft text-certified" },
    { id: "interview" as CandidatureStatus, title: "Entretien en cours", color: "bg-muted text-muted-foreground" },
  ];

  const openWhatsApp = (offer: Offer) => {
    const message = `Bonjour, je suis intéressé par le poste de ${offer.title} chez ${offer.company}. Pourriez-vous me donner plus d'informations ?`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (favoriteOffers.length === 0) {
    return (
      <div className="container-page py-10">
        <h1 className="text-3xl font-bold">Mes Favoris</h1>
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <Bookmark className="mx-auto h-16 w-16 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">Aucun favori pour le moment</p>
          <p className="mt-2 text-sm text-muted-foreground">Explorez les offres certifiées et ajoutez vos préférées.</p>
          <Link to="/offres" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Explorer les offres <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold">Mes Favoris</h1>
      <p className="mt-2 text-muted-foreground">Gérez vos candidatures avec le pipeline Kanban</p>
      
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {columns.map((col) => (
          <div key={col.id} className="rounded-2xl border border-border bg-card p-4">
            <div className={`mb-4 rounded-xl px-4 py-2 text-sm font-semibold ${col.color}`}>
              {col.title} ({favoriteOffers.filter((o) => statuses[o.id] === col.id).length})
            </div>
            <div className="space-y-3">
              {favoriteOffers
                .filter((o) => statuses[o.id] === col.id)
                .map((offer) => (
                  <div key={offer.id} className="rounded-xl border border-border bg-muted/50 p-4">
                    <h3 className="text-sm font-bold">{offer.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{offer.company} · {offer.zone}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {col.id === "to_apply" && (
                        <button
                          onClick={() => updateStatus(offer.id, "sent")}
                          className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                        >
                          <CheckCircle className="h-3 w-3" /> Envoyée
                        </button>
                      )}
                      {col.id === "sent" && (
                        <button
                          onClick={() => updateStatus(offer.id, "interview")}
                          className="flex items-center gap-1 rounded-lg bg-certified px-3 py-1.5 text-xs font-semibold text-certified-foreground hover:bg-certified/90"
                        >
                          <CheckCircle className="h-3 w-3" /> Entretien
                        </button>
                      )}
                      <button
                        onClick={() => openWhatsApp(offer)}
                        className="flex items-center gap-1 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600"
                      >
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </button>
                      <button
                        onClick={() => toggleFavorite(offer.id)}
                        className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent"
                      >
                        <Heart className="h-3 w-3 fill-red-500 text-red-500" /> Retirer
                      </button>
                    </div>
                  </div>
                ))}
              {favoriteOffers.filter((o) => statuses[o.id] === col.id).length === 0 && (
                <p className="py-8 text-center text-xs text-muted-foreground">Aucune offre dans cette colonne</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
