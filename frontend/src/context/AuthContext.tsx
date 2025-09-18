import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/api/client";

type Tokens = { access: string; refresh: string } | null;

type AuthContextValue = {
  isAuthenticated: boolean;
  tokens: Tokens;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<Tokens>(() => {
    const raw = localStorage.getItem("tokens");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (tokens) localStorage.setItem("tokens", JSON.stringify(tokens));
    else localStorage.removeItem("tokens");
  }, [tokens]);

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: Boolean(tokens?.access),
    tokens,

    async login(username: string, password: string) {
      const { data } = await api.post("/api/auth/login/", { username, password });
      setTokens({ access: data.access, refresh: data.refresh });
    },
    logout() {
      setTokens(null);
    },
  }), [tokens]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

