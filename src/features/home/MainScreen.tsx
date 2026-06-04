import { useBudget } from '@/contexts/BudgetContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BalanceCard from '@/src/components/home/BalanceCard';
import BudgetStatusCard from '@/src/components/home/BudgetStatusCard';
import QuickExpenseInput from '@/src/components/home/QuickExpenseInput';
import QuickMenuGrid from '@/src/components/home/QuickMenuGrid';

const TEXT = {
  appTitle: '내 계좌',
  settings: '설정',
};


export default function MainScreen() {
  const router = useRouter();
  const [monthlySpent, setMonthlySpent] = useState(0);
  const { budgets } = useBudget();

  const monthlyBudget = budgets.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const balance = monthlyBudget - monthlySpent;

  const handleAddExpense = (amount: number) => {
    setMonthlySpent((prev) => {
      const nextSpent = prev + amount;

      if (prev <= monthlyBudget && nextSpent > monthlyBudget) {
        router.push({
          pathname: '/budget-alert' as any,
          params: {
            budget: String(monthlyBudget),
            spent: String(nextSpent),
          },
        });
      }

      return nextSpent;
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
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
});
