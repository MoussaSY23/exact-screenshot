import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth, shortName } from "@/lib/auth";

export const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/offres", label: "Offres & IA" },
  { to: "/espace", label: "Mon Espace" },
  { to: "/transparence", label: "Transparence" },
] as const;

const UNIS = ["UCAD", "UMEF", "ESP", "ISM"];

function LoginDialog() {
  const { openLogin, setOpenLogin, login } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [uni, setUni] = useState("UCAD");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const local = email.split("@")[0] ?? "";
    const parts = local.split(/[._-]/).filter(Boolean).map((p) => (p[0] ?? "").toUpperCase() + p.slice(1));
    const name = parts.length >= 2 ? `${parts[0]} ${parts[1]}` : "Modou Sene";
    login({ name, email, university: uni });
    setOpenLogin(false);
    setPwd("");
    navigate({ to: "/espace" });
  };

  return (
    <Dialog open={openLogin} onOpenChange={setOpenLogin}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connexion étudiant</DialogTitle>
          <DialogDescription>Accédez à votre espace candidat Solusen.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <input type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="modou.sene@ucad.edu.sn" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
          <input type="password" required minLength={4} value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Mot de passe" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
          <div className="grid grid-cols-4 gap-2">
            {UNIS.map((u) => (
              <button type="button" key={u} onClick={() => setUni(u)} className={`rounded-xl border py-2 text-sm font-semibold ${uni === u ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-accent"}`}>
                {u}
              </button>
            ))}
          </div>
          <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Se connecter</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AuthButton() {
  const { user, setOpenLogin, logout } = useAuth();
  if (!user)
    return (
      <button onClick={() => setOpenLogin(true)} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
        Se connecter
      </button>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold shadow-sm hover:bg-accent">
        👤 {shortName(user.name)}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/espace"><LayoutDashboard className="mr-2 h-4 w-4" />Mon Espace</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}><LogOut className="mr-2 h-4 w-4" />Déconnexion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg shadow-sm">🎓</span>
          <span className="text-lg font-bold tracking-tight">Solusen</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground" activeProps={{ className: "bg-primary-soft text-primary font-semibold" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <AuthButton />
          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 hover:bg-accent md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className={`overflow-hidden border-t border-border bg-background transition-all duration-300 md:hidden ${open ? "max-h-80" : "max-h-0 border-t-0"}`}>
        <nav className="container-page flex flex-col py-3">
          {NAV.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent" activeProps={{ className: "text-primary font-semibold" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <LoginDialog />
    </header>
  );
}
