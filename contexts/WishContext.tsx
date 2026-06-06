import { createContext, useContext, useState } from "react";

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
  const [wishPlan, setWishPlan] = useState<WishPlan | null>(null);

  const saveWishPlan = (plan: Omit<WishPlan, "startedAt">) => {
    setWishPlan({
      ...plan,
      startedAt: new Date().toISOString(),
    });
  };

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
