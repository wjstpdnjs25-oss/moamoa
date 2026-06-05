import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBudget } from '../../../contexts/BudgetContext';

import BalanceCard from '@/src/components/home/BalanceCard';
import BudgetStatusCard from '@/src/components/home/BudgetStatusCard';
import QuickExpenseInput from '@/src/components/home/QuickExpenseInput';
import QuickMenuGrid from '@/src/components/home/QuickMenuGrid';
import UsageCompareCard from '@/src/components/home/UsageCompareCard';
import WishSaveCard from '@/src/components/home/WishSaveCard';

const TEXT = {
  appTitle: '내 계좌',
};

const SOFT_PURPLE = '#f5efff';
const DEEP_PURPLE = '#4f287f';

type WishItem = {
  id: number;
  title: string;
  targetAmount: number;
  savedAmount: number;
};

export default function MainScreen() {
  const router = useRouter();
  const [monthlySpent, setMonthlySpent] = useState(0);
  const { budgets } = useBudget();
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [wishList, setWishList] = useState<WishItem[]>([]);

  const monthlyBudget = budgets.reduce((sum, item) => sum + item.amount, 0);
  const balance = monthlyBudget - monthlySpent;

  const addWish = () => {
    const amount = Number(targetAmount);

    if (!title.trim() || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setWishList((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        targetAmount: amount,
        savedAmount: 0,
      },
    ]);

    setTitle('');
    setTargetAmount('');
  };

  const handleSaveAmount = (id: number, amount: number) => {
    setWishList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              savedAmount: Math.min(item.savedAmount + amount, item.targetAmount),
            }
          : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setWishList((prev) => prev.filter((item) => item.id !== id));
  };

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>{TEXT.appTitle}</Text>
        </View>

        <BalanceCard balance={balance} monthlySpent={monthlySpent} />

        <QuickExpenseInput onSaveExpense={handleAddExpense} />

        <BudgetStatusCard />

        <View style={styles.inputCard}>
          <Text style={styles.cardTitle}>나의 위시</Text>

          <TextInput
            onChangeText={setTitle}
            placeholder="사고 싶은 것 (예: 에어팟)"
            style={styles.input}
            value={title}
          />

          <TextInput
            keyboardType="numeric"
            onChangeText={(value) => setTargetAmount(value.replace(/[^0-9]/g, ''))}
            placeholder="목표 금액"
            style={styles.input}
            value={targetAmount}
          />

          <TouchableOpacity onPress={addWish} style={styles.addButton}>
            <Text style={styles.addButtonText}>추가</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wishList}>
          {wishList.map((item) => (
            <WishSaveCard
              key={item.id}
              onDelete={() => handleDelete(item.id)}
              onSave={(amount: number) => handleSaveAmount(item.id, amount)}
              savedAmount={item.savedAmount}
              targetAmount={item.targetAmount}
              title={item.title}
            />
          ))}
        </View>

        <UsageCompareCard />

        <View style={styles.quickMenu}>
          <QuickMenuGrid />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
    fontSize: 24,
    fontWeight: '700',
  },
  cardTitle: {
    color: DEEP_PURPLE,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  inputCard: {
    backgroundColor: SOFT_PURPLE,
    borderRadius: 16,
    marginBottom: 16,
    marginTop: 10,
    padding: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
    padding: 12,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#3D5AFE',
    borderRadius: 10,
    marginTop: 10,
    padding: 12,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  wishList: {
    gap: 12,
    marginBottom: 24,
  },
  quickMenu: {
    marginTop: 24,
  },
});
