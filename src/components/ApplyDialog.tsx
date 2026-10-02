import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Offer } from "@/lib/offers";

export function ApplyDialog({ offer, onClose }: { offer: Offer | null; onClose: () => void }) {
  const [name, setName] = useState("Modou Sene");
  const [email, setEmail] = useState("modou.sene@ucad.edu.sn");
  const [file, setFile] = useState("");
  const [letter, setLetter] = useState("");
  const [sent, setSent] = useState(false);

  const close = () => {
    setName("Modou Sene");
    setEmail("modou.sene@ucad.edu.sn");
    setFile("");
    setLetter("");
    setSent(false);
    onClose();
  };

  return (
    <Dialog open={!!offer} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-lg">
        {offer && !sent && (
          <>
            <DialogHeader>
              <DialogTitle>Postuler — {offer.title}</DialogTitle>
              <DialogDescription>{offer.company} · {offer.zone} · {offer.pay}</DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium">Nom complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">E-mail étudiant</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                />
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-muted p-4 text-sm hover:bg-accent">
                <Upload className="h-5 w-5 text-primary" />
                <span>{file || "Joindre votre CV (PDF)"}</span>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
              </label>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium">Lettre de motivation (optionnel)</span>
                  <button
                    type="button"
                    onClick={() =>
                      setLetter(
                        `Madame, Monsieur,\n\nÉtudiant motivé, je souhaite rejoindre ${offer.company} pour le poste de ${offer.title}. Rigoureux et curieux, je suis convaincu de pouvoir contribuer à vos projets à Dakar.\n\nCordialement.`,
                      )
                    }
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    ✨ Générer en 1 clic
                  </button>
                </div>
                <textarea
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  placeholder="Message de motivation court (optionnel)"
                  className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-ring"
                />
              </div>
              <button disabled={!file} className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                Envoyer ma candidature
              </button>
            </form>
          </>
        )}
        {sent && (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-certified" />
            <p className="mt-4 text-lg font-bold">Candidature transmise !</p>
            <p className="mt-1 text-sm text-muted-foreground">Votre candidature a été transmise gratuitement à l'entreprise sans intermédiaire !</p>
            <button onClick={close} className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Fermer</button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
