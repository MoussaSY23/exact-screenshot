import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & orientation — Solusen" },
      {
        name: "description",
        content:
          "Contactez l'équipe Solusen pour être orienté vers un stage ou une formation certifiée à Dakar. Swiss UMEF University Dakar, Sénégal.",
      },
      { property: "og:title", content: "Contact & orientation — Solusen" },
      {
        property: "og:description",
        content:
          "Une question, un besoin d'orientation ? L'équipe Solusen vous répond et vous guide vers des offres vérifiées.",
      },
    ],
  }),
  component: Contact,
});

const UNIVERSITIES = ["UCAD", "UMEF", "Université Numérique", "Autre"];

const inputClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    university: "",
    email: "",
    phone: "",
    field: "",
    message: "",
  });

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-secondary/30">
      <section className="hero-mesh border-b border-border">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Contact & orientation
          </span>
          <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            Parlons de votre avenir professionnel
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Décrivez votre profil et votre objectif : l'équipe Solusen vous oriente vers les offres
            certifiées qui correspondent à votre parcours.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-12 md:grid-cols-[1fr_360px] md:py-16">
        {/* Formulaire */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-certified-soft text-3xl text-certified">
                ✓
              </span>
              <h2 className="mt-6 text-2xl font-bold text-foreground">
                Merci {form.name.split(" ")[0] || ""} !
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Votre demande d'orientation a bien été enregistrée. L'équipe Solusen vous recontacte
                sous 48 h à l'adresse <span className="font-semibold text-foreground">{form.email}</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", university: "", email: "", phone: "", field: "", message: "" });
                }}
                className="mt-8 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground">
                    Nom complet *
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => update("name")(e.target.value)}
                    placeholder="Ex : Modou Diop"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="university"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    Université / École *
                  </label>
                  <select
                    id="university"
                    required
                    value={form.university}
                    onChange={(e) => update("university")(e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Sélectionnez votre établissement
                    </option>
                    {UNIVERSITIES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email")(e.target.value)}
                    placeholder="vous@exemple.sn"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-foreground">
                    Téléphone *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => update("phone")(e.target.value)}
                    placeholder="+221 77 000 00 00"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="field" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Domaine de recherche *
                </label>
                <input
                  id="field"
                  required
                  value={form.field}
                  onChange={(e) => update("field")(e.target.value)}
                  placeholder="Ex : Marketing digital, Développement web, Comptabilité…"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message")(e.target.value)}
                  placeholder="Présentez brièvement votre parcours et le type d'offre que vous recherchez…"
                  className={`${inputClass} resize-y`}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
              >
                Envoyer ma demande
              </button>
              <p className="text-xs text-muted-foreground">
                Vos données restent confidentielles et ne sont jamais partagées avec des tiers.
              </p>
            </form>
          )}
        </div>

        {/* Coordonnées */}
        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-foreground">📍 Notre adresse</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Swiss UMEF University Dakar
              <br />
              Dakar, Sénégal
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-foreground">📞 Contact direct</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contact@solusen.sn" className="transition-colors hover:text-primary">
                  contact@solusen.sn
                </a>
              </li>
              <li>+221 33 800 00 00</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-certified/30 bg-certified-soft p-6">
            <h2 className="font-display text-lg font-bold text-foreground">🛡️ Engagement anti-arnaque</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Aucune offre relayée par Solusen ne demande de paiement pour décrocher un stage.
              Un doute ? Signalez-le nous, nous vérifions sous 24 h.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
