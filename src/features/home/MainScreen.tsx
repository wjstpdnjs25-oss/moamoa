import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import BalanceCard from '@/src/components/home/BalanceCard';
import BudgetStatusCard from '@/src/components/home/BudgetStatusCard';
import QuickExpenseInput from '@/src/components/home/QuickExpenseInput';
import QuickMenuGrid from '@/src/components/home/QuickMenuGrid';

const TEXT = {
  appTitle: '내 계좌',
  settings: '설정',
};

const MONTHLY_BUDGET = 500000;

export default function MainScreen() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(0);

  const handleAddExpense = (amount: number) => {
    setMonthlySpent((prev) => {
      const nextSpent = prev + amount;

      if (prev <= MONTHLY_BUDGET && nextSpent > MONTHLY_BUDGET) {
        router.push({
          pathname: '/budget-alert',
          params: {
            budget: String(MONTHLY_BUDGET),
            spent: String(nextSpent),
          },
        });
      }

      return nextSpent;
    });
    setBalance((prev) => prev - amount);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>{TEXT.appTitle}</Text>

        <TouchableOpacity style={styles.settingButton}
        onPress={() => router.push("/settings" as any)}
        >
          <Text style={styles.settingText}>{TEXT.settings}</Text>
        </TouchableOpacity>
      </View>

      <BalanceCard balance={balance} monthlySpent={monthlySpent} />

      <QuickExpenseInput onSaveExpense={handleAddExpense} />

      <BudgetStatusCard />

      <QuickMenuGrid />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FB',
  },
  content: {
    padding: 22,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
    marginTop: 18,
  },
  appTitle: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '700',
  },
  settingButton: {
    backgroundColor: '#EEF0FF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  settingText: {
    color: '#3D5AFE',
    fontSize: 14,
    fontWeight: '700',
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
