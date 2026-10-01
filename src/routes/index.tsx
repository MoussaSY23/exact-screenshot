import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-dakar.jpg";
import modouImg from "@/assets/modou-ucad.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solusen — Trouvez votre stage certifié à Dakar" },
      {
        name: "description",
        content:
          "Plateforme d'insertion professionnelle pour les étudiants et jeunes diplômés de Dakar : stages et formations vérifiés, sans arnaque et sans « bras long ».",
      },
      { property: "og:title", content: "Solusen — Trouvez votre stage certifié à Dakar" },
      {
        property: "og:description",
        content:
          "Des stages et formations certifiés à Dakar, accessibles à tous les mérites. Fini les arnaques et le piston.",
      },
 { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "1 200+", label: "Étudiants accompagnés" },
  { value: "450+", label: "Offres certifiées" },
  { value: "0", label: "Arnaque tolérée" },
];

const needs = [
  {
    title: "Des offres fiables",
    text: "Chaque annonce est vérifiée avant publication : entreprise identifiée, conditions réelles, gratification annoncée.",
  },
  {
    title: "Une égalité des chances",
    text: "Plus besoin d'un « bras long » pour décrocher un stage : la sélection se fait sur le mérite, pas sur le carnet d'adresses.",
  },
  {
    title: "Un accompagnement concret",
    text: "Orientation, candidature et suivi centralisés au même endroit, pensés pour les réalités du marché dakarois.",
  },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-mesh overflow-hidden">
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-xs font-semibold text-primary">
              ✦ Plateforme d'insertion professionnelle — Dakar
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Trouvez votre stage <span className="text-primary">certifié</span> à Dakar
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Solusen centralise les stages et formations vérifiés de la capitale. Fini les fausses
              promesses et la dépendance au « bras long » : votre mérite suffit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/offres"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
                Chercher une offre
              </Link>
              <a
                href="#persona"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                En savoir plus
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="Étudiants dakarois sur la corniche"
              width={1536}
              height={1024}
              className="relative rounded-3xl object-cover shadow-2xl shadow-primary/15"
            />
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="border-y border-border bg-secondary/50">
        <div className="container-page grid gap-8 py-12 sm:grid-cols-3 md:py-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold text-primary md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Persona : Modou */}
      <section id="persona" className="container-page scroll-mt-24 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative order-2 md:order-1">
            <img
              src={modouImg}
              alt="Modou, étudiant à l'UCAD"
              loading="lazy"
              width={768}
              height={1024}
              className="rounded-3xl object-cover shadow-xl shadow-primary/10"
            />
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-border bg-card px-5 py-3.5 shadow-lg sm:right-6">
              <p className="text-sm font-semibold text-foreground">🎓 Modou, 23 ans</p>
              <p className="text-xs text-muted-foreground">Master 2 Gestion — UCAD</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-certified">
              Le parcours de Modou
            </span>
            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
              Un étudiant brillant, mais seul face au marché
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Modou termine son Master à l'UCAD. Comme des milliers d'étudiants dakarois, il passe
              des heures sur WhatsApp et Facebook à chercher un stage — entre fausses annonces,
              intermédiaires payants et entreprises introuvables.
            </p>
            <div className="mt-8 space-y-5">
              {needs.map((need) => (
                <div key={need.title} className="flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-certified-soft text-sm font-bold text-certified">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{need.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {need.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/offres"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Découvrir les offres vérifiées →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
