import { StyleSheet, Text, View } from "react-native";

import { useBudget } from "@/contexts/BudgetContext";
import { useExpense } from "@/contexts/ExpenseContext";

export default function BudgetStatusCard() {
  const { budgets } = useBudget();
  const { expenses } = useExpense();

  const totalBudget = budgets.reduce((sum, item) => sum + item.amount, 0);

  const today = new Date();
  const monthPrefix = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  const totalSpent = expenses
    .filter((expense) => expense.spentDate.startsWith(monthPrefix))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const rate =
    totalBudget === 0 ? 0 : Math.min((totalSpent / totalBudget) * 100, 100);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>이번 달 예산</Text>

      <Text style={styles.budgetText}>
        ₩{totalBudget.toLocaleString()} 중
      </Text>

      <Text style={styles.usedText}>
        ₩{totalSpent.toLocaleString()} 사용
      </Text>

      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${rate}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EEF0FF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 18,
  },
  budgetText: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 10,
  },
  usedText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 18,
  },
  progressBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#DADDED",
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3D5AFE",
  },
});
