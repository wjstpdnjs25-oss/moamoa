import { createContext, useContext, useMemo, useState } from 'react';

export type BudgetCategory = 'food' | 'transport' | 'shopping' | 'cafe';

type BudgetContextValue = {
  budgets: Record<BudgetCategory, number>;
  totalBudget: number;
  setBudgetAmount: (category: BudgetCategory, amount: number) => void;
};

const BudgetContext = createContext<BudgetContextValue | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budgets, setBudgets] = useState<Record<BudgetCategory, number>>({
    food: 0,
    transport: 0,
    shopping: 0,
    cafe: 0,
  });

  const totalBudget = useMemo(
    () => Object.values(budgets).reduce((sum, amount) => sum + amount, 0),
    [budgets],
  );

  const setBudgetAmount = (category: BudgetCategory, amount: number) => {
    setBudgets((prev) => ({ ...prev, [category]: amount }));
  };

  return (
    <BudgetContext.Provider value={{ budgets, totalBudget, setBudgetAmount }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error('useBudget must be used within BudgetProvider');
  }

  return context;
}
