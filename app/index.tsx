import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BalanceCard from "@/components/home/BalanceCard";
import BudgetStatusCard from "@/components/home/BudgetStatusCard";
import QuickExpenseInput from "@/components/home/QuickExpenseInput";
import QuickMenuGrid from "@/components/home/QuickMenuGrid";

const TEXT = {
  appTitle: "\uB0B4 \uACC4\uC88C",
  settings: "\uC124\uC815",
};

const MONTHLY_BUDGET = 500000;

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(0);

  const handleAddExpense = (amount: number) => {
    setMonthlySpent((prev) => prev + amount);
    setBalance((prev) => prev - amount);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.appTitle}>{TEXT.appTitle}</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingText}>{TEXT.settings}</Text>
        </TouchableOpacity>
      </View>

      <BalanceCard balance={balance} monthlySpent={monthlySpent} />

      <QuickExpenseInput onSaveExpense={handleAddExpense} />

      <BudgetStatusCard />

      <QuickMenuGrid />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  content: {
    padding: 22,
    paddingBottom: 40,
  },
  header: {
    marginTop: 18,
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
  },
  settingButton: {
    backgroundColor: "#EEF0FF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  settingText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3D5AFE",
  },
});
