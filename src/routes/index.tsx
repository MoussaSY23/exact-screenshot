import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FileSearch, Ban, Scale, Quote, ShieldCheck, BadgeCheck, Coins, ArrowRight, Sparkles, Search, MapPin, Briefcase, MessageCircle, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const [searchQuery, setSearchQuery] = useState("");
  const [domain, setDomain] = useState("Tous");
  const [zone, setZone] = useState("Toutes");
  const [profileType, setProfileType] = useState<"student" | "company">("student");

  const domains = ["Tous", "Informatique", "Finance", "Marketing", "Transit", "Audit"];
  const zones = ["Toutes", "Plateau", "Point E", "Almadies", "Mermoz", "Zone Portuaire"];
  const popularTags = ["Dev Web", "Wave", "Gaindé 2000", "Marketing", "Audit"];

  return (
    <div className="pt-24">
      {/* Hero Section - Dark Premium */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#150935] via-[#1B0B40] to-[#0F0524]">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-purple-600/20 blur-3xl opacity-20 pointer-events-none"></div>
        
        <div className="container-page relative grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          {/* Left Column */}
          <div className="space-y-6">
            <span className="text-purple-300 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase inline-block">
              Opportunités vérifiées à Dakar
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Trouvez le stage certifié qui correspond à vos talents & ambitions
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-xl">
              Explorez les opportunités de stage et de formation vérifiées à Dakar sans intermédiaire ni frais de dossier cachés.
            </p>
            
            {/* Profile Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setProfileType("student")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  profileType === "student"
                    ? "bg-white text-purple-900"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Je cherche un stage
              </button>
              <button
                onClick={() => setProfileType("company")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  profileType === "company"
                    ? "bg-white text-purple-900"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Je suis une entreprise
              </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-3 md:p-4 shadow-2xl flex flex-col md:flex-row items-center gap-3 mt-6">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Intitulé ou mot-clé"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full md:w-auto px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-500 bg-white"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full md:w-auto px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-500 bg-white"
              >
                {zones.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
              <button
                onClick={() => navigate({ to: "/offres" })}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Rechercher
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  className="bg-white/10 hover:bg-white/20 text-white/80 text-xs px-3 py-1 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <img
              src={heroImg}
              alt="Étudiants professionnels"
              width={600}
              height={500}
              className="w-full rounded-2xl object-cover shadow-2xl"
            />
            
            {/* Floating Stat Cards */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl text-white shadow-xl flex items-center gap-3 max-w-[180px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <ShieldCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs font-semibold">100% Gratuit</p>
                <p className="text-[10px] text-white/70">0 FCFA Frais de dossier</p>
              </div>
            </div>
            
            <div className="absolute bottom-20 left-4 bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl text-white shadow-xl flex items-center gap-3 max-w-[180px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                <Briefcase className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold">Entreprises Certifiées</p>
                <p className="text-[10px] text-white/70">Vérification NINEA</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl text-white shadow-xl flex items-center gap-3 max-w-[180px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                <MessageCircle className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-semibold">Insertion Directe</p>
                <p className="text-[10px] text-white/70">Contact direct sans intermédiaire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="bg-[#0B031E] border-y border-white/10">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">100%</p>
            <p className="text-sm text-purple-300 mt-1">Stages certifiés</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">0 FCFA</p>
            <p className="text-sm text-purple-300 mt-1">Frais de dossier</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">10+</p>
            <p className="text-sm text-purple-300 mt-1">Partenaires à Dakar</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">1 Clic</p>
            <p className="text-sm text-purple-300 mt-1">Postulation directe WhatsApp</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Écosystème de partenaires vérifiés</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {PARTNERS.map((p) => <span key={p} className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground">{p}</span>)}
          </div>
        </div>
      </section>

      <section className="container-page grid grid-cols-2 gap-px bg-border py-16 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-card p-6 text-center">
            <p className="text-3xl font-extrabold text-primary md:text-4xl"><Counter n={s.n} suffix={s.suffix} /></p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="container-page pb-20">
        <div className="flex items-end justify-between gap-4">
          <div><span className="section-label">Sélection du moment</span><h2 className="mt-2 text-3xl font-bold">Opportunités en vedette</h2></div>
          <Link to="/offres" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Tout voir <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {OFFERS.filter((o) => ["wave", "gainde", "bdo"].includes(o.id)).map((o) => (
            <OfferCard key={o.id} offer={o} action="Voir le détail" onAction={() => navigate({ to: "/offres" })} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card py-20">
        <div className="container-page">
          <div className="text-center"><span className="section-label">Notre engagement</span><h2 className="mt-2 text-3xl font-bold">Notre Charte Anti-Arnaque</h2></div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-certified-soft text-certified"><p.icon className="h-6 w-6" /></span>
                <h3 className="mt-4 font-bold">{i + 1}. {p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid items-center gap-10 border border-border bg-card p-6 shadow-sm md:grid-cols-[280px_1fr] md:p-10">
          <img src={modouImg} alt="Modou Sene, étudiant à l'UCAD" loading="lazy" width={768} height={1024} className="mx-auto h-72 w-56 rounded-lg object-cover" />
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
        <Accordion type="single" collapsible className="mt-8 border border-border bg-card px-6 shadow-sm">
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
