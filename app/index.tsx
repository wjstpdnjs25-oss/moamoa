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
        <Text style={styles.appTitle}>내 계좌</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingIcon}>⚙︎</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  settingIcon: {
    fontSize: 38,
  },
});*/
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Text>MOAMOA TEST</Text>
    </View>
  );
}
