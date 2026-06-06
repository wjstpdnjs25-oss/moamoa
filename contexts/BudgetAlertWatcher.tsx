import { usePathname, useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useMemo, useRef } from "react";

import { useBudget } from "./BudgetContext";
import { useExpense } from "./ExpenseContext";

export function BudgetAlertWatcher() {
  const pathname = usePathname();
  const rootNavigationState = useRootNavigationState();
  const router = useRouter();
  const { budgets } = useBudget();
  const { expenses, isReady } = useExpense();
  const hasShownBudgetAlert = useRef(false);

  const monthlyBudget = useMemo(
    () => budgets.reduce((sum, item) => sum + item.amount, 0),
    [budgets]
  );

  const monthlySpent = useMemo(() => {
    const today = new Date();
    const monthPrefix = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;

    return expenses
      .filter((expense) => expense.spentDate.startsWith(monthPrefix))
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  useEffect(() => {
    if (
      !rootNavigationState?.key ||
      !isReady ||
      monthlyBudget <= 0 ||
      monthlySpent <= monthlyBudget
    ) {
      hasShownBudgetAlert.current = false;
      return;
    }

    if (hasShownBudgetAlert.current || pathname === "/budget-alert") {
      return;
    }

    hasShownBudgetAlert.current = true;
    router.push({
      pathname: "/budget-alert",
      params: {
        budget: String(monthlyBudget),
        spent: String(monthlySpent),
      },
    });
  }, [
    isReady,
    monthlyBudget,
    monthlySpent,
    pathname,
    rootNavigationState?.key,
    router,
  ]);

  return null;
}
