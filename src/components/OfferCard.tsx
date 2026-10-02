import { MapPin, Wallet, BadgeCheck } from "lucide-react";
import type { Offer } from "@/lib/offers";

export function OfferCard({ offer, action, onAction }: { offer: Offer; action: string; onAction: () => void }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-certified-soft px-2.5 py-1 text-xs font-bold text-certified">
          <BadgeCheck className="h-3.5 w-3.5" /> Certifiée Solusen
        </span>
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">{offer.tag}</span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{offer.type}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug">{offer.title}</h3>
      <p className="mt-1 text-sm font-medium text-muted-foreground">{offer.company} · {offer.level}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{offer.zone}</span>
        <span className="inline-flex items-center gap-1.5 font-semibold"><Wallet className="h-4 w-4 text-certified" />{offer.pay}</span>
      </div>
      <button onClick={onAction} className="mt-5 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
        {action}
      </button>
    </article>
  );
}
