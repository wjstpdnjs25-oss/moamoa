 feat_wishsave
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
import UsageCompareCard from '@/src/components/home/UsageCompareCard';
import WishSaveCard from '@/src/components/home/WishSaveCard';

import { useRouter } from "expo-router";
import { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useBudget } from "../../../contexts/BudgetContext";

import BalanceCard from "@/src/components/home/BalanceCard";
import BudgetStatusCard from "@/src/components/home/BudgetStatusCard";
import QuickExpenseInput from "@/src/components/home/QuickExpenseInput";
import QuickMenuGrid from "@/src/components/home/QuickMenuGrid";
main

const TEXT = {
  appTitle: '내 계좌',
  settings: '설정',
};
 feat_wishsave
const SOFT_PURPLE = '#f5efff';
const DEEP_PURPLE = '#4f287f';

export default function MainScreen() {
  const router = useRouter();

  const [balance, setBalance] = useState(0);



export default function MainScreen() {
  const router = useRouter();
> main
  const [monthlySpent, setMonthlySpent] = useState(0);
  const { budgets } = useBudget();

  const monthlyBudget = budgets.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const balance = monthlyBudget - monthlySpent;

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
feat_wishsave
    setMonthlySpent(prev => prev + amount);
    setBalance(prev => prev - amount);

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
main
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>{TEXT.appTitle}</Text>

      </View>

      {/* CARDS */}
      <BalanceCard balance={balance} monthlySpent={monthlySpent} />

      <QuickExpenseInput onSaveExpense={handleAddExpense} />

      <BudgetStatusCard />

      {/* INPUT */}
<View style={styles.inputCard}>
  <Text style={styles.cardTitle}>나의 위시</Text>

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
</View>


     {/* WISH LIST */}
<View style={{ marginBottom: 24 }}>
  {wishList.map(item => (
    <WishSaveCard
      key={item.id}
      title={item.title}
      targetAmount={item.targetAmount}

      savedAmount={currentSavedAmount} 
      onSave={handleSaveAmount}       
  
      onDelete={() => handleDelete(item.id)}
    />
  ))}
</View>

<UsageCompareCard />

{/* QUICK MENU */}
<View style={{ marginTop: 24 }}>
  <QuickMenuGrid />
</View>
    </ScrollView>
 feat_wishsave
    

    </SafeAreaView>
 main
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
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  
  cardTitle: {
  fontSize: 24,
  fontWeight: '800',
  color: DEEP_PURPLE,
  marginBottom: 10,
},
inputCard: {
  backgroundColor: '#f5efff',
  borderRadius: 16,
  padding: 16,
  marginTop: 10,
  marginBottom: 16,
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
 feat_wishsave
});

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
 main
