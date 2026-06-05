import { createContext, useContext, useState } from "react";

export type ExpenseItem = {
  id: string;
  category: string;
  amount: number;
  date: string;
};

type ExpenseContextType = {
  expenses: ExpenseItem[];
  addExpense: (expense: ExpenseItem) => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  const addExpense = (expense: ExpenseItem) => {
    setExpenses((prev) => [...prev, expense]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense must be used within ExpenseProvider");
  }

  return context;
}
