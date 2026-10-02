import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type MockUser = { name: string; email: string; university: string };
type Ctx = { user: MockUser | null; login: (u: MockUser) => void; logout: () => void; openLogin: boolean; setOpenLogin: (v: boolean) => void };

const AuthCtx = createContext<Ctx | null>(null);
const KEY = "solusen-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [openLogin, setOpenLogin] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const login = (u: MockUser) => {
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY);
  };
  return <AuthCtx.Provider value={{ user, login, logout, openLogin, setOpenLogin }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth outside AuthProvider");
  return c;
}

export function shortName(name: string) {
  const [first, last] = name.split(" ");
  return last ? `${first} ${last[0]}.` : first;
}
