import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";
import {
  getWishPlanForUser,
  saveWishPlanForUser,
} from "@/src/data/accountDataRepository";

export type WishPlan = {
  title: string;
  targetAmount: number;
  durationDays: number;
  startedAt: string;
};

type WishContextType = {
  wishPlan: WishPlan | null;
  saveWishPlan: (plan: Omit<WishPlan, "startedAt">) => void;
};

const WishContext = createContext<WishContextType | undefined>(undefined);

export function WishProvider({ children }: { children: React.ReactNode }) {
  const { currentUserId } = useAuth();
  const [wishPlan, setWishPlan] = useState<WishPlan | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadWishPlan() {
      if (!currentUserId) {
        setWishPlan(null);
        return;
      }

      const nextWishPlan = await getWishPlanForUser(currentUserId);

      if (mounted) {
        setWishPlan(nextWishPlan);
      }
    }

    loadWishPlan().catch((error) => {
      console.error("Failed to load wish plan", error);
      if (mounted) {
        setWishPlan(null);
      }
    });

    return () => {
      mounted = false;
    };
  }, [currentUserId]);

  const saveWishPlan = useCallback((plan: Omit<WishPlan, "startedAt">) => {
    const nextWishPlan = {
      ...plan,
      startedAt: new Date().toISOString(),
    };

    setWishPlan(nextWishPlan);

    if (currentUserId) {
      saveWishPlanForUser(currentUserId, nextWishPlan).catch((error) => {
        console.error("Failed to save wish plan", error);
      });
    }
  }, [currentUserId]);

  return (
    <WishContext.Provider value={{ wishPlan, saveWishPlan }}>
      {children}
    </WishContext.Provider>
  );
}

export function useWish() {
  const context = useContext(WishContext);

  if (!context) {
    throw new Error("useWish must be used within WishProvider");
  }

  return context;
}
