import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  currentUserId: string | null;
  login: (userId: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      currentUserId,
      login: (userId: string) => setCurrentUserId(userId.trim()),
      logout: () => setCurrentUserId(null),
    }),
    [currentUserId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
