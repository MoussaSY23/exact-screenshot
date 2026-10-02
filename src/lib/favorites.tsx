import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type FavoritesContextValue = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = "solusen-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite: (id) => favorites.includes(id) }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites outside FavoritesProvider");
  return context;
}