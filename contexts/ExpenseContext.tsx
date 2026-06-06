import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  createExpense,
  CreateExpenseInput,
  ExpenseRecord,
  getAllExpenses,
  initializeExpenseDatabase,
} from "@/src/data/expenseRepository";
import { useAuth } from "./AuthContext";

type ExpenseContextType = {
  expenses: ExpenseRecord[];
  isReady: boolean;
  refreshToken: number;
  addExpense: (expense: CreateExpenseInput) => Promise<ExpenseRecord>;
  reloadExpenses: () => Promise<void>;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { currentUserId } = useAuth();
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);

  const reloadExpenses = useCallback(async () => {
    if (!currentUserId) {
      setExpenses([]);
      return;
    }

    const nextExpenses = await getAllExpenses(currentUserId);
    setExpenses(nextExpenses);
  }, [currentUserId]);

  useEffect(() => {
    let mounted = true;

    async function prepareDatabase() {
      await initializeExpenseDatabase();

      if (!mounted) {
        return;
      }

      await reloadExpenses();
      setIsReady(true);
    }

    prepareDatabase().catch((error) => {
      console.error("Failed to initialize expense database", error);
    });

    return () => {
      mounted = false;
    };
  }, [reloadExpenses]);

  const addExpense = useCallback(async (expense: CreateExpenseInput) => {
    if (!currentUserId) {
      throw new Error("Cannot save expense without a logged-in user");
    }

    const savedExpense = await createExpense(currentUserId, expense);

    setExpenses((prev) => [savedExpense, ...prev]);
    setRefreshToken((prev) => prev + 1);

    return savedExpense;
  }, [currentUserId]);

  return (
    <ExpenseContext.Provider
      value={{ expenses, isReady, refreshToken, addExpense, reloadExpenses }}
    >
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
