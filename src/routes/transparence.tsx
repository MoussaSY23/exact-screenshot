import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MapPin, MessageCircle, Mail } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/transparence")({
  head: () => ({
    meta: [
      { title: "Transparence & Contact — Solusen" },
      { name: "description", content: "Notre mission contre la corruption et le népotisme à Dakar. Déposez une offre certifiée ou signalez une annonce suspecte." },
      { property: "og:title", content: "Transparence & Contact — Solusen" },
      { property: "og:description", content: "Entreprises : déposez une offre certifiée. Étudiants : signalez une annonce ou demandez une orientation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Transparence,
});

const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring";

const companySchema = z.object({
  name: z.string().trim().min(2).max(120),
  ninea: z.string().trim().regex(/^[0-9A-Za-z ]{7,15}$/, "NINEA invalide"),
  title: z.string().trim().min(3).max(120),
  amount: z.coerce.number().min(0).max(2000000),
});
const studentSchema = z.object({ email: z.string().trim().email().max(255), message: z.string().trim().min(10).max(1000) });

function Success({ text }: { text: string }) {
  return (
    <div className="py-10 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-certified" />
      <p className="mt-3 font-semibold">{text}</p>
    </div>
  );
}

function CompanyForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  if (done) return <Success text="Offre reçue. Vérification du NINEA sous 48 h." />;
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.currentTarget));
        const r = companySchema.safeParse(fd);
        if (!r.success) return setErr(r.error.issues[0]?.message ?? "Champs invalides");
        setDone(true);
      }}
    >
      <input name="name" required placeholder="Nom de la structure" className={field} />
      <input name="ninea" required placeholder="NINEA" className={field} />
      <input name="title" required placeholder="Titre de l'offre" className={field} />
      <input name="amount" type="number" required min={0} placeholder="Gratification proposée (FCFA/mois)" className={field} />
      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input type="checkbox" required className="mt-1" />
        Je m'engage sur l'honneur à ne réclamer aucun frais aux candidats et à respecter la gratification annoncée.
      </label>
      {err && <p className="text-sm text-destructive">{err}</p>}
      <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Déposer une offre certifiée</button>
    </form>
  );
}

function StudentForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  if (done) return <Success text="Message reçu. Notre équipe vous répond sous 48 h." />;
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const r = studentSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
        if (!r.success) return setErr("Vérifiez votre e-mail et écrivez au moins 10 caractères.");
        setDone(true);
      }}
    >
      <select name="kind" className={field}>
        <option>Signaler une annonce suspecte</option>
        <option>Demande d'orientation</option>
      </select>
      <input name="email" type="email" required placeholder="Votre e-mail étudiant" className={field} />
      <textarea name="message" required rows={5} maxLength={1000} placeholder="Décrivez la situation (lien, entreprise, montant demandé…)" className={field} />
      {err && <p className="text-sm text-destructive">{err}</p>}
      <button className="w-full rounded-xl bg-certified py-3 text-sm font-semibold text-certified-foreground hover:bg-certified/90">Envoyer</button>
    </form>
  );
}

function Transparence() {
  return (
    <div>
      <section className="hero-mesh border-b border-border">
        <div className="container-page max-w-3xl py-14 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-certified">Notre mission</span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">Un premier emploi ne devrait jamais s'acheter</h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            À Dakar, trop de jeunes diplômés se heurtent au népotisme, aux faux recruteurs et aux frais de dossier illégaux. Solusen vérifie chaque entreprise, publie chaque gratification et sanctionne toute dérive, pour que seul le mérite compte.
          </p>
        </div>
      </section>
      <section className="container-page grid gap-6 py-12 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">Entreprises : déposer une offre certifiée</h2>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">Publication gratuite après vérification légale.</p>
          <CompanyForm />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">Étudiants : signalement ou orientation</h2>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">Signalement confidentiel, traité sous 48 h.</p>
          <StudentForm />
        </div>
      </section>
      <section className="container-page pb-16">
        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm md:grid-cols-3">
          <div className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /><div><p className="font-semibold">Swiss UMEF University</p><p className="text-sm text-muted-foreground">Campus de Dakar, Sénégal</p></div></div>
          <a href="https://wa.me/221770000000" target="_blank" rel="noreferrer" className="flex gap-3"><MessageCircle className="h-5 w-5 shrink-0 text-certified" /><div><p className="font-semibold">WhatsApp assistance</p><p className="text-sm text-muted-foreground">+221 77 000 00 00</p></div></a>
          <div className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" /><div><p className="font-semibold">E-mail</p><p className="text-sm text-muted-foreground">contact@solusen.sn</p></div></div>
        </div>
        <iframe title="Carte Dakar" className="mt-6 h-72 w-full rounded-2xl border border-border" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-17.50%2C14.66%2C-17.42%2C14.73&layer=mapnik" />
      </section>
    </div>
  );
}
