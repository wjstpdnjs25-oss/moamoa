import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishSave,
  saveWishSave,
} from "@/src/data/expenseRepository";

export type WishPlan = {
  title: string;
  targetAmount: number;
  durationDays: number;
  startedAt: string;
};

type WishContextType = {
  wishPlan: WishPlan | null;
  saveWishPlan: (plan: Omit<WishPlan, "startedAt">) => Promise<void>;
};

const WishContext = createContext<WishContextType | undefined>(undefined);

export function WishProvider({ children }: { children: React.ReactNode }) {
  const [wishPlan, setWishPlan] = useState<WishPlan | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadWishPlan() {
      const savedWishPlan = await getWishSave();

      if (!mounted || !savedWishPlan) {
        return;
      }

      setWishPlan({
        title: savedWishPlan.wishItemName,
        targetAmount: savedWishPlan.wishItemPrice,
        durationDays: savedWishPlan.savingPeriod,
        startedAt: savedWishPlan.startedAt,
      });
    }

    loadWishPlan().catch((error) => {
      console.error("Failed to load wish save database", error);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const saveWishPlan = useCallback(async (plan: Omit<WishPlan, "startedAt">) => {
    const nextWishPlan = {
      ...plan,
      startedAt: new Date().toISOString(),
    };

    setWishPlan(nextWishPlan);

    await saveWishSave({
      wishItemName: nextWishPlan.title,
      wishItemPrice: nextWishPlan.targetAmount,
      savingPeriod: nextWishPlan.durationDays,
      startedAt: nextWishPlan.startedAt,
    });
  }, []);

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
