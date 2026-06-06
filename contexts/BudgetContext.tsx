import { createContext, useContext, useState } from "react";

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
  setBudgetAmount: (category: string, amount: number) => void;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budgets, setBudgets] = useState<BudgetItem[]>(
    DEFAULT_CATEGORIES.map((category) => ({
      category,
      amount: 0,
    }))
  );

  const setBudgetAmount = (category: string, amount: number) => {
    setBudgets((prev) =>
      prev.map((item) =>
        item.category === category ? { ...item, amount } : item
      )
    );
  };

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