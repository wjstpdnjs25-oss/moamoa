import { StyleSheet, Text, View } from "react-native";

import { useBudget } from "@/contexts/BudgetContext";
import { useExpense } from "@/contexts/ExpenseContext";

const TEXT = {
  balanceLabel: "남은 예산",
  monthlySpentLabel: "이번 달 사용 금액",
  won: "\u20A9",
};

export default function BalanceCard() {
  const { budgets } = useBudget();
  const { expenses } = useExpense();

  const monthlyBudget = budgets.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const today = new Date();
  const monthPrefix = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  const monthlySpent = expenses
    .filter((expense) => expense.spentDate.startsWith(monthPrefix))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const balance = monthlyBudget - monthlySpent;

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{TEXT.balanceLabel}</Text>

      <Text style={styles.balanceText}>
        {TEXT.won}
        {balance.toLocaleString()}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.subLabel}>{TEXT.monthlySpentLabel}</Text>

      <Text style={styles.subAmount}>
        {TEXT.won}
        {monthlySpent.toLocaleString()}
      </Text>
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
  cardLabel: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 16,
  },
  balanceText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#DADDED",
    marginBottom: 18,
  },
  subLabel: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 8,
  },
  subAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
  },
});
