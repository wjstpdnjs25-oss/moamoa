import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import {
  getBudgetsForUser,
  saveBudgetForUser,
} from "@/src/data/accountDataRepository";

export const DEFAULT_CATEGORIES = [
  "음식",
  "패션",
  "주거",
  "교통",
  "카페/간식",
  "쇼핑",
  "문화/여가",
  "교육",
  "의료/건강",
  "기타",
];

type BudgetItem = {
  category: string;
  amount: number;
};

type BudgetContextType = {
  budgets: BudgetItem[];
  setBudgetAmount: (category: string, amount: number) => Promise<void>;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const { currentUserId } = useAuth();
  const [budgets, setBudgets] = useState<BudgetItem[]>(createEmptyBudgets());

  useEffect(() => {
    let mounted = true;

    async function loadBudgets() {
      if (!currentUserId) {
        setBudgets(createEmptyBudgets());
        return;
      }

      const nextBudgets = await getBudgetsForUser(currentUserId);

      if (mounted) {
        setBudgets(nextBudgets);
      }
    }

    loadBudgets().catch((error) => {
      console.error("Failed to load budgets", error);
      if (mounted) {
        setBudgets(createEmptyBudgets());
      }
    });

    return () => {
      mounted = false;
    };
  }, [currentUserId]);

  const setBudgetAmount = useCallback(async (category: string, amount: number) => {
    const nextBudgets = budgets.map((item) =>
      item.category === category ? { ...item, amount } : item
    );

    setBudgets(nextBudgets);

    if (currentUserId) {
      await saveBudgetForUser(currentUserId, category, amount);
    }
  }, [budgets, currentUserId]);

  return (
    <BudgetContext.Provider value={{ budgets, setBudgetAmount }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error("useBudget must be used within BudgetProvider");
  }

  return context;
}

function createEmptyBudgets() {
  return DEFAULT_CATEGORIES.map((category) => ({
    category,
    amount: 0,
  }));
}
