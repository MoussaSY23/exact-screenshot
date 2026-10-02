import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, LogOut, LayoutDashboard, Sparkles, GraduationCap, Phone, Mail, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth, shortName } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/offres", label: "Trouver un stage" },
  { to: "/favoris", label: "Mes Favoris" },
  { to: "/espace", label: "Entreprises partenaires" },
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
          <Button className="h-11 w-full rounded-lg">Se connecter</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AuthButton() {
  const { user, setOpenLogin, logout } = useAuth();
  if (!user)
    return (
      <Button onClick={() => setOpenLogin(true)} className="rounded-lg">
        Se connecter
      </Button>
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
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Topbar ultra-fine */}
      <div className="bg-[#0B031E] border-b border-white/10">
        <div className="container-page flex items-center justify-between py-1.5 text-xs text-white/70">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> +221 33 820 00 00</span>
            <span className="hidden sm:flex items-center gap-1.5"><Mail className="h-3 w-3" /> contact@solusen.sn</span>
          </div>
          <span className="flex items-center gap-1.5 text-purple-300"><ShieldCheck className="h-3 w-3" /> Anti-fraude certifié</span>
        </div>
      </div>
      
      {/* Navbar principale */}
      <div className="bg-[#150935] border-b border-white/10">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg"><GraduationCap className="h-5 w-5" /></span>
            <span className="text-xl font-bold text-white">Solusen</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white" activeProps={{ className: "bg-white/10 text-white font-semibold" }} activeOptions={{ exact: true }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={() => document.querySelector<HTMLButtonElement>("[data-open-assistant]")?.click()} className="hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-medium px-4 py-2 text-sm shadow-md lg:inline-flex">
              <Sparkles className="mr-2 h-4 w-4" />Assistant IA
            </Button>
            <AuthButton />
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="md:hidden text-white hover:bg-white/10" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`overflow-hidden bg-[#150935] border-t border-white/10 transition-all duration-300 md:hidden ${open ? "max-h-80" : "max-h-0 border-t-0"}`}>
        <nav className="container-page flex flex-col py-3">
          {NAV.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/10" activeProps={{ className: "text-white font-semibold" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
          <Button onClick={() => document.querySelector<HTMLButtonElement>("[data-open-assistant]")?.click()} className="mt-3 w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-medium px-4 py-2 text-sm shadow-md">
            <Sparkles className="mr-2 h-4 w-4" />Assistant IA
          </Button>
        </nav>
      </div>
      <LoginDialog />
    </header>
  );
}
