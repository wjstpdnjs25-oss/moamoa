import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useBudget } from "../../../contexts/BudgetContext";
import { useExpense } from "../../../contexts/ExpenseContext";

import BalanceCard from "@/src/components/home/BalanceCard";
import BudgetStatusCard from "@/src/components/home/BudgetStatusCard";
import QuickExpenseInput from "@/src/components/home/QuickExpenseInput";
import QuickMenuGrid from "@/src/components/home/QuickMenuGrid";
import UsageCompareCard from "@/src/components/home/UsageCompareCard";
import WishSaveCard from "@/src/components/home/WishSaveCard";
import { getExpenseCategoryIcon } from "@/src/constants/expense";

const TEXT = {
  appTitle: "모아모아",
  wishTitle: "나의 위시",
  wishNamePlaceholder: "사고 싶은 것",
  wishAmountPlaceholder: "목표 금액",
  addWish: "추가",
};

const SOFT_PURPLE = "#f5efff";
const DEEP_PURPLE = "#4f287f";

type WishItem = {
  id: number;
  title: string;
  targetAmount: number;
  savedAmount: number;
};

export default function MainScreen() {
  const router = useRouter();
  const { budgets } = useBudget();
  const { addExpense, expenses } = useExpense();
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [wishList, setWishList] = useState<WishItem[]>([]);

  const monthlyBudget = budgets.reduce((sum, item) => sum + item.amount, 0);

const monthlySpent = useMemo(() => {
  const today = new Date();
  const monthPrefix = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  return expenses
    .filter((expense) => expense.spentDate.startsWith(monthPrefix))
    .reduce((sum, expense) => sum + expense.amount, 0);
}, [expenses]);

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

    setTitle("");
    setTargetAmount("");
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

  const handleAddExpense = async (amount: number, category: string) => {
    const previousSpent = monthlySpent;
    const today = new Date();

    await addExpense({
      amount,
      category,
      icon: getExpenseCategoryIcon(category),
      label: category,
      source: "quick",
      spentAt: today,
    });

    const nextSpent = previousSpent + amount;

    if (previousSpent <= monthlyBudget && nextSpent > monthlyBudget) {
      router.push({
        pathname: "/budget-alert" as never,
        params: {
          budget: String(monthlyBudget),
          spent: String(nextSpent),
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40: 0} 
      >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.appTitle}>{TEXT.appTitle}</Text>
        </View>

        <BalanceCard />

        <BudgetStatusCard />

        <QuickExpenseInput onSaveExpense={handleAddExpense} />


        <View style={styles.inputCard}>
          <Text style={styles.cardTitle}>{TEXT.wishTitle}</Text>

          <TextInput
            onChangeText={setTitle}
            placeholder={TEXT.wishNamePlaceholder}
            style={styles.input}
            value={title}
          />

          <TextInput
            keyboardType="numeric"
            onChangeText={(value) => setTargetAmount(value.replace(/[^0-9]/g, ""))}
            placeholder={TEXT.wishAmountPlaceholder}
            style={styles.input}
            value={targetAmount}
          />

          <TouchableOpacity onPress={addWish} style={styles.addButton}>
            <Text style={styles.addButtonText}>{TEXT.addWish}</Text>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    marginTop: 20,
  },
  appTitle: {
    color: "#111111",
    fontSize: 24,
    fontWeight: "700",
  },
  cardTitle: {
    color: DEEP_PURPLE,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  inputCard: {
    backgroundColor: SOFT_PURPLE,
    borderRadius: 16,
    marginBottom: 20,
    marginTop: 16,
    padding: 16,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    padding: 12,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#3D5AFE",
    borderRadius: 10,
    marginTop: 10,
    padding: 12,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  wishList: {
    gap: 12,
    marginBottom: 40,
  },
  quickMenu: {
    marginTop: 480,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
