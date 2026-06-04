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

import BalanceCard from '@/src/components/home/BalanceCard';
import BudgetStatusCard from '@/src/components/home/BudgetStatusCard';
import QuickExpenseInput from '@/src/components/home/QuickExpenseInput';
import QuickMenuGrid from '@/src/components/home/QuickMenuGrid';
import WishSaveCard from '@/src/components/home/WishSaveCard';

const TEXT = {
  appTitle: '내 계좌',
  settings: '설정',
};

export default function MainScreen() {
  const router = useRouter();

  const [balance, setBalance] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(0);

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const [wishList, setWishList] = useState<any[]>([]);

  const addWish = () => {
    if (!title || !targetAmount) return;

    setWishList(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        targetAmount: Number(targetAmount),
        savedAmount: 0,
      },
    ]);

    setTitle('');
    setTargetAmount('');
  };

  const handleAddExpense = (amount: number) => {
    setMonthlySpent(prev => prev + amount);
    setBalance(prev => prev - amount);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>{TEXT.appTitle}</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingText}>{TEXT.settings}</Text>
        </TouchableOpacity>
      </View>

      {/* CARDS */}
      <BalanceCard balance={balance} monthlySpent={monthlySpent} />

      <QuickExpenseInput onSaveExpense={handleAddExpense} />

      <BudgetStatusCard />

      {/* INPUT */}
      <TextInput
        placeholder="사고 싶은 것 (예: 에어팟)"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="목표 금액"
        value={targetAmount}
        onChangeText={setTargetAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={addWish} style={styles.addButton}>
        <Text style={styles.addButtonText}>추가</Text>
      </TouchableOpacity>

      {/* WISH LIST */}
      {wishList.map(item => (
        <WishSaveCard
          key={item.id}
          title={item.title}
          targetAmount={item.targetAmount}
          savedAmount={item.savedAmount}
        />
      ))}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 18,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  settingButton: {
    backgroundColor: '#EEF0FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  settingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D5AFE',
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  addButton: {
    backgroundColor: '#3D5AFE',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});