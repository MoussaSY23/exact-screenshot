import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FileSearch, Ban, Scale, Quote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { OfferCard } from "@/components/OfferCard";
import { OFFERS } from "@/lib/offers";
import heroImg from "@/assets/hero-dakar.jpg";
import modouImg from "@/assets/modou-ucad.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solusen — L'insertion professionnelle au mérite à Dakar" },
      { name: "description", content: "Stages, alternances et formations certifiés à Dakar. Zéro arnaque, zéro frais, zéro « bras long »." },
      { property: "og:title", content: "Solusen — L'insertion professionnelle au mérite à Dakar" },
      { property: "og:description", content: "Des opportunités vérifiées et un agent d'orientation IA pour les étudiants de Dakar." },
    ],
  }),
  component: Index,
});

const PARTNERS = ["Sonatel", "Wave", "GAINDÉ 2000", "Orange Digital Center", "UN-CHK", "BDO Sénégal"];
const STATS = [
  { n: 1200, suffix: "+", label: "étudiants orientés" },
  { n: 450, suffix: "+", label: "offres vérifiées à 100%" },
  { n: 0, suffix: " FCFA", label: "de frais réclamés aux candidats" },
  { n: 85, suffix: "%", label: "d'insertion sous 6 mois" },
];
const PILLARS = [
  { icon: FileSearch, title: "Vérification légale du NINEA", text: "Chaque entreprise est contrôlée au registre avant toute publication." },
  { icon: Ban, title: "Zéro frais de dossier", text: "Interdiction absolue de demander de l'argent aux candidats. Toute demande est bannie." },
  { icon: Scale, title: "Gratification minimale garantie", text: "Les stages respectent la gratification minimale légale, affichée en toute transparence." },
];
const FAQ = [
  { q: "Solusen est-il vraiment gratuit pour les étudiants ?", a: "Oui. Aucun frais n'est jamais demandé aux candidats, ni par Solusen ni par les entreprises partenaires." },
  { q: "Comment les offres sont-elles vérifiées ?", a: "Nous contrôlons le NINEA de l'entreprise, la réalité du poste et le montant de la gratification avant publication." },
  { q: "Qui signe la convention de stage ?", a: "La convention tripartite est signée entre vous, votre université (UCAD, UMEF, ESP, ISM…) et l'entreprise. Solusen vous guide à chaque étape." },
  { q: "Que faire si je repère une annonce suspecte ?", a: "Signalez-la depuis la page Transparence : notre équipe l'examine sous 48 h et la retire si nécessaire." },
];

function Counter({ n, suffix }: { n: number; suffix: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [n]);
  return <span ref={ref}>{v.toLocaleString("fr-FR")}{suffix}</span>;
}

function Index() {
  const navigate = useNavigate();
  const openAssistant = () => document.querySelector<HTMLButtonElement>("[data-open-assistant]")?.click();
  return (
    <div>
      <section className="hero-mesh overflow-hidden">
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex rounded-full border border-primary/20 bg-card px-4 py-1.5 text-xs font-semibold text-primary">✦ Plateforme d'insertion — Dakar</span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
              L'insertion professionnelle <span className="text-primary">au mérite</span> à Dakar, zéro « bras long ».
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Fini les faux stages et les intermédiaires payants. Chaque offre est vérifiée et chaque gratification contrôlée.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/offres" className="rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90">Explorer les opportunités certifiées</Link>
              <button onClick={openAssistant} className="rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold shadow-sm hover:bg-accent">Tester l'Agent d'orientation IA ✨</button>
            </div>
          </div>
          <img src={heroImg} alt="Étudiants dakarois sur la corniche" width={1536} height={1024} className="rounded-3xl object-cover shadow-xl" />
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">Écosystème de partenaires vérifiés</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {PARTNERS.map((p) => <span key={p} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground">{p}</span>)}
          </div>
        </div>
      </section>

      <section className="container-page grid grid-cols-2 gap-6 py-16 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <p className="text-3xl font-extrabold text-primary md:text-4xl"><Counter n={s.n} suffix={s.suffix} /></p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="container-page pb-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold">Opportunités en vedette</h2>
          <Link to="/offres" className="text-sm font-semibold text-primary hover:underline">Tout voir →</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {OFFERS.filter((o) => ["wave", "gainde", "bdo"].includes(o.id)).map((o) => (
            <OfferCard key={o.id} offer={o} action="Voir le détail" onAction={() => navigate({ to: "/offres" })} />
          ))}
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container-page">
          <h2 className="text-center text-3xl font-bold">Notre Charte Anti-Arnaque</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-certified-soft text-certified"><p.icon className="h-6 w-6" /></span>
                <h3 className="mt-4 font-bold">{i + 1}. {p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-6 shadow-md md:grid-cols-[280px_1fr] md:p-10">
          <img src={modouImg} alt="Modou Sene, étudiant à l'UCAD" loading="lazy" width={768} height={1024} className="mx-auto h-72 w-56 rounded-2xl object-cover" />
          <div>
            <Quote className="h-8 w-8 text-primary" />
            <p className="mt-4 text-lg leading-relaxed">« Pendant des mois, on m'a demandé de payer pour des stages qui n'existaient pas. Sur Solusen, j'ai postulé chez GAINDÉ 2000 sans connaître personne, et j'ai décroché mon entretien en deux semaines. »</p>
            <p className="mt-5 font-bold">Modou Sene</p>
            <p className="text-sm text-muted-foreground">Licence 3 Informatique — UCAD · Stagiaire chez GAINDÉ 2000</p>
          </div>
        </div>
      </section>

      <section className="container-page max-w-3xl pb-20">
        <h2 className="text-center text-3xl font-bold">Questions fréquentes</h2>
        <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-border bg-card px-6 shadow-sm">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`q${i}`}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
