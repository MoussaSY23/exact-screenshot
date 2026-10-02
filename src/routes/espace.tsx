import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Plus, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { OFFERS } from "@/lib/offers";
import modouImg from "@/assets/modou-ucad.jpg";

export const Route = createFileRoute("/espace")({
  head: () => ({
    meta: [
      { title: "Mon Espace candidat — Solusen" },
      { name: "description", content: "Suivez vos candidatures, complétez votre profil et recevez des recommandations IA sur-mesure." },
      { property: "og:title", content: "Mon Espace candidat — Solusen" },
      { property: "og:description", content: "Le tableau de bord de l'étudiant Solusen : compétences, candidatures et recommandations." },
    ],
  }),
  component: Espace,
});

const APPS = [
  { company: "Wave Digital Finance", role: "Stagiaire Product Analyst", date: "28 sept. 2026", status: "Candidature transmise", tone: "bg-primary-soft text-primary" },
  { company: "GAINDÉ 2000", role: "Développeur Full-Stack", date: "21 sept. 2026", status: "Entretien programmé", tone: "bg-certified-soft text-certified" },
  { company: "Sonatel Siège", role: "Stagiaire Marketing Digital", date: "15 sept. 2026", status: "En cours d'examen", tone: "bg-muted text-muted-foreground" },
];

function Espace() {
  const { user, setOpenLogin } = useAuth();
  const [skills, setSkills] = useState(["React", "Python", "SYSCOHADA", "Anglais professionnel"]);
  const [newSkill, setNewSkill] = useState("");
  const name = user?.name ?? "Modou Sene";
  const uni = user?.university ?? "UCAD";
  const completion = Math.min(100, 70 + skills.length * 4);

  return (
    <div className="container-page py-10 md:py-14">
      {!user && (
        <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-primary/20 bg-primary-soft p-4 text-sm sm:flex-row sm:items-center">
          <p>Vous consultez un profil de démonstration. Connectez-vous pour personnaliser votre espace.</p>
          <button onClick={() => setOpenLogin(true)} className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Se connecter</button>
        </div>
      )}
      <div className="flex flex-col items-start gap-5 rounded-3xl border border-border bg-card p-6 shadow-md sm:flex-row sm:items-center">
        <img src={modouImg} alt={name} className="h-20 w-20 rounded-2xl object-cover" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-certified-soft px-2.5 py-1 text-xs font-bold text-certified"><BadgeCheck className="h-3.5 w-3.5" />Profil Vérifié</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">🟢 En recherche active — Licence 3 · {uni}</p>
        </div>
      </div>

      <Tabs defaultValue="cv" className="mt-8">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="cv">Mes Compétences & CV</TabsTrigger>
          <TabsTrigger value="apps">Mes Candidatures</TabsTrigger>
          <TabsTrigger value="reco">Recommandations IA</TabsTrigger>
        </TabsList>

        <TabsContent value="cv" className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between text-sm font-semibold"><span>Complétion du profil</span><span className="text-primary">{completion}%</span></div>
          <Progress value={completion} className="mt-2" />
          <h2 className="mt-8 font-bold">Compétences</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary">
                {s}
                <button onClick={() => setSkills(skills.filter((x) => x !== s))} aria-label={`Retirer ${s}`}><X className="h-3.5 w-3.5" /></button>
              </span>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const v = newSkill.trim();
              if (v && !skills.includes(v)) setSkills([...skills, v]);
              setNewSkill("");
            }}
            className="mt-4 flex max-w-sm gap-2"
          >
            <input value={newSkill} maxLength={40} onChange={(e) => setNewSkill(e.target.value)} placeholder="Ajouter une compétence" className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
            <button className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" />Ajouter</button>
          </form>
        </TabsContent>

        <TabsContent value="apps" className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-muted text-left text-muted-foreground">
              <tr><th className="p-4">Entreprise</th><th className="p-4">Poste</th><th className="p-4">Date</th><th className="p-4">Statut</th></tr>
            </thead>
            <tbody>
              {APPS.map((a) => (
                <tr key={a.company} className="border-t border-border">
                  <td className="p-4 font-semibold">{a.company}</td>
                  <td className="p-4">{a.role}</td>
                  <td className="p-4 text-muted-foreground">{a.date}</td>
                  <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${a.tone}`}>● {a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="reco" className="mt-6 grid gap-5 md:grid-cols-2">
          {[{ o: OFFERS[2]!, s: 94 }, { o: OFFERS[5]!, s: 88 }].map(({ o, s }) => (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-certified-soft px-3 py-1 text-xs font-bold text-certified">{s}% de compatibilité</span>
                <span className="text-xs text-muted-foreground">✨ IA</span>
              </div>
              <h3 className="mt-4 font-bold">{o.title}</h3>
              <p className="text-sm text-muted-foreground">{o.company} · {o.zone} · {o.pay}</p>
              <p className="mt-3 text-sm text-muted-foreground">Correspond à vos compétences React et Python.</p>
              <Link to="/offres" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">Voir l'offre →</Link>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
