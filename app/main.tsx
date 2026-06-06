import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BalanceCard from '@/components/home/BalanceCard';
import BudgetStatusCard from '@/components/home/BudgetStatusCard';
import QuickExpenseInput from '@/components/home/QuickExpenseInput';
import QuickMenuGrid from '@/components/home/QuickMenuGrid';
import { useBudget } from '@/contexts/BudgetContext';

const TEXT = {
  appTitle: '내 계좌',
  settings: '설정',
};

export default function MainScreen() {
  const router = useRouter();
  const { totalBudget } = useBudget();
  const [balance, setBalance] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(0);
  const hasShownBudgetAlert = useRef(false);

  useEffect(() => {
    if (totalBudget <= 0 || monthlySpent <= totalBudget) {
      hasShownBudgetAlert.current = false;
      return;
    }

    if (hasShownBudgetAlert.current) {
      return;
    }

    hasShownBudgetAlert.current = true;
    router.push({
      pathname: '/budget-alert',
      params: {
        budget: String(totalBudget),
        spent: String(monthlySpent),
      },
    });
  }, [monthlySpent, router, totalBudget]);

  const handleAddExpense = (amount: number) => {
    setMonthlySpent((prev) => prev + amount);
    setBalance((prev) => prev - amount);
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

      <BudgetStatusCard budget={totalBudget} spent={monthlySpent} />

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
