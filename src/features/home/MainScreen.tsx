import { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useBudget } from "../../../contexts/BudgetContext";
import { useExpense } from "../../../contexts/ExpenseContext";
import { useWish } from "../../../contexts/WishContext";

import BalanceCard from "@/src/components/home/BalanceCard";
import BudgetStatusCard from "@/src/components/home/BudgetStatusCard";
import QuickExpenseInput from "@/src/components/home/QuickExpenseInput";
import QuickMenuGrid from "@/src/components/home/QuickMenuGrid";
import UsageCompareCard from "@/src/components/home/UsageCompareCard";
import WishSaveCard from "@/src/components/home/WishSaveCard";
import { getExpenseCategoryIcon } from "@/src/constants/expense";

const TEXT = {
  appTitle: "모아모아",
};

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function MainScreen() {
  const { budgets } = useBudget();
  const { addExpense, expenses } = useExpense();
  const { wishPlan } = useWish();

  const monthlyBudget = budgets.reduce((sum, item) => sum + item.amount, 0);

  const wishProgress = useMemo(() => {
    if (!wishPlan) {
      return null;
    }

    const dailyBudget = Math.max(
      0,
      Math.floor(
        (monthlyBudget - wishPlan.targetAmount) / wishPlan.durationDays
      )
    );
    const startedAt = new Date(wishPlan.startedAt);
    const today = new Date();
    const elapsedDays = Math.min(
      wishPlan.durationDays,
      Math.max(
        1,
        Math.floor(
          (new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() -
            new Date(
              startedAt.getFullYear(),
              startedAt.getMonth(),
              startedAt.getDate()
            ).getTime()) /
            86400000
        ) + 1
      )
    );
    const spentByDate = expenses.reduce<Record<string, number>>((totals, expense) => {
      totals[expense.spentDate] = (totals[expense.spentDate] ?? 0) + expense.amount;
      return totals;
    }, {});
    let compliantDays = 0;

    for (let dayOffset = 0; dayOffset < elapsedDays; dayOffset += 1) {
      const date = new Date(
        startedAt.getFullYear(),
        startedAt.getMonth(),
        startedAt.getDate() + dayOffset
      );

      if ((spentByDate[formatDateKey(date)] ?? 0) <= dailyBudget) {
        compliantDays += 1;
      }
    }

    return {
      achievementRate: Math.round((compliantDays / elapsedDays) * 100),
      compliantDays,
      dailyBudget,
      evaluatedDays: elapsedDays,
    };
  }, [expenses, monthlyBudget, wishPlan]);

  const handleAddExpense = async (amount: number, category: string) => {
    const today = new Date();

    await addExpense({
      amount,
      category,
      icon: getExpenseCategoryIcon(category),
      label: category,
      source: "quick",
      spentAt: today,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40: 0} 
      >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.appTitle}>{TEXT.appTitle}</Text>
        </View>

        <BalanceCard />

        <BudgetStatusCard />

        {wishPlan && wishProgress && (
          <WishSaveCard
            achievementRate={wishProgress.achievementRate}
            compliantDays={wishProgress.compliantDays}
            dailyBudget={wishProgress.dailyBudget}
            evaluatedDays={wishProgress.evaluatedDays}
            title={wishPlan.title}
          />
        )}

        <UsageCompareCard expenses={expenses} />

        <QuickMenuGrid />
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    marginTop: 20,
  },
  appTitle: {
    color: "#111111",
    fontSize: 24,
    fontWeight: "700",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
