import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NAV } from "./SiteHeader";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-lg font-bold">🎓 Solusen</p>
          <p className="mt-3 text-sm leading-relaxed opacity-70">L'insertion professionnelle au mérite à Dakar. Offres vérifiées, zéro frais, zéro « bras long ».</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Liens utiles</p>
          <ul className="mt-4 space-y-2 text-sm opacity-70">
            {NAV.map((l) => <li key={l.to}><Link to={l.to} className="hover:opacity-100 hover:underline">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Contact</p>
          <ul className="mt-4 space-y-2 text-sm opacity-70">
            <li>Swiss UMEF University Campus, Dakar</li>
            <li>contact@solusen.sn</li>
            <li>WhatsApp : +221 77 000 00 00</li>
          </ul>
          <div className="mt-4 flex gap-3 text-sm">
            <a href="#" className="opacity-70 hover:opacity-100">LinkedIn</a>
            <a href="#" className="opacity-70 hover:opacity-100">Instagram</a>
            <a href="#" className="opacity-70 hover:opacity-100">X</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Newsletter étudiante</p>
          {done ? (
            <p className="mt-4 text-sm text-certified">✓ Inscription confirmée !</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-4 flex gap-2">
              <input type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre e-mail" className="min-w-0 flex-1 rounded-lg border border-ink-foreground/20 bg-transparent px-3 py-2 text-sm outline-none" />
              <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">OK</button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs opacity-60 md:flex-row md:justify-between">
          <p>© 2026 Solusen — Tous droits réservés.</p>
          <p>Mentions légales · Politique de confidentialité</p>
        </div>
      </div>
    </footer>
  );
}
