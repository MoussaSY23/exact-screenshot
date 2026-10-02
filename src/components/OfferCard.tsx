import { MapPin, Heart, BadgeCheck } from "lucide-react";
import type { Offer } from "@/lib/offers";
import { useFavorites } from "@/lib/favorites";
import { Button } from "@/components/ui/button";

const companyTone: Record<string, string> = {
  wave: "bg-primary-soft text-primary",
  gainde: "bg-secondary/10 text-secondary",
  odc: "bg-warning-soft text-warning",
  bdo: "bg-info-soft text-info",
  sonatel: "bg-warning-soft text-warning",
  "3w": "bg-primary-soft text-primary",
  pikine: "bg-certified-soft text-certified",
};

export function OfferCard({ offer, action, onAction }: { offer: Offer; action: string; onAction: () => void }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(offer.id);
  const initials = offer.company.split(" ").slice(0, 2).map((word) => word[0]).join("");
  return (
    <article className="group flex min-h-[340px] flex-col border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-md">
      <div className="flex items-start gap-3">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${companyTone[offer.id] ?? "bg-primary-soft text-primary"}`}>{initials}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold leading-snug">{offer.title}</h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{offer.company}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(offer.id)} aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"} title={favorite ? "Retirer des favoris" : "Ajouter aux favoris"} className={favorite ? "text-secondary" : "text-muted-foreground"}>
          <Heart className={favorite ? "fill-current" : ""} />
        </Button>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-certified-soft px-2.5 py-1 text-xs font-bold text-certified"><BadgeCheck className="h-3.5 w-3.5" />Certifié Solusen</span>
        <span className="rounded-md bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">{offer.tag}</span>
        <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{offer.type}</span>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{offer.zone}</span>
        <span className="rounded-md bg-certified-soft px-2.5 py-1.5 font-bold text-certified">{offer.pay}</span>
      </div>
      <Button onClick={onAction} className="mt-4 h-11 w-full rounded-lg">{action}</Button>
    </article>
  );
}
