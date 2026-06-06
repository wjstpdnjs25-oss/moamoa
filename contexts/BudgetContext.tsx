import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getBudgets,
  saveBudgets,
} from "@/src/data/expenseRepository";

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
  const [budgets, setBudgets] = useState<BudgetItem[]>(
    DEFAULT_CATEGORIES.map((category) => ({
      category,
      amount: 0,
    }))
  );

  useEffect(() => {
    let mounted = true;

    async function loadBudgets() {
      const savedBudgets = await getBudgets();

      if (!mounted || savedBudgets.length === 0) {
        return;
      }

      setBudgets((prev) =>
        prev.map((item) => {
          const savedBudget = savedBudgets.find(
            (budget) => budget.categoryName === item.category
          );

          return savedBudget
            ? { ...item, amount: savedBudget.categoryBudget }
            : item;
        })
      );
    }

    loadBudgets().catch((error) => {
      console.error("Failed to load budget database", error);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const setBudgetAmount = useCallback(async (category: string, amount: number) => {
    const nextBudgets = budgets.map((item) =>
      item.category === category ? { ...item, amount } : item
    );

    setBudgets(nextBudgets);

    const totalBudget = nextBudgets.reduce((sum, item) => sum + item.amount, 0);

    await saveBudgets(
      nextBudgets.map((item) => ({
        categoryName: item.category,
        categoryBudget: item.amount,
        totalBudget,
      }))
    );
  }, [budgets]);

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
