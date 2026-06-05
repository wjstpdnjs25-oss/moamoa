import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import BalanceCard from "@/src/components/home/BalanceCard";
import BudgetStatusCard from "@/src/components/home/BudgetStatusCard";
import QuickExpenseInput from "@/src/components/home/QuickExpenseInput";
import QuickMenuGrid from "@/src/components/home/QuickMenuGrid";
import UsageCompareCard from "@/src/components/home/UsageCompareCard";
import WishSaveCard from "@/src/components/home/WishSaveCard";

const TEXT = {
  appTitle: "\uB0B4 \uACC4\uC88C",
  settings: "\uC124\uC815",
};

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(0);
  const [wishTitle, setWishTitle] = useState("");
  const [wishPrice, setWishPrice] = useState("");

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


      </View>

      <BalanceCard balance={balance} monthlySpent={monthlySpent} />

      <BudgetStatusCard />

      <QuickExpenseInput onSaveExpense={handleAddExpense} />


  <View style={styles.inputContainer}>
    <TextInput
    placeholder="사고 싶은 물건"
    value={wishTitle}
    onChangeText={setWishTitle}
    style={styles.input}
    />

    <TextInput
    placeholder="목표 금액"
    keyboardType="numeric"
    value={wishPrice}
    onChangeText={setWishPrice}
    style={styles.input}
    />

    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>
      추가하기
    </Text>
  </TouchableOpacity>
</View>
      <WishSaveCard
  title={wishTitle || "위시 아이템"}
  targetAmount={Number(wishPrice) || 0}
  savedAmount={150000}
  onDelete={() => console.log("삭제")}
  onSave={(amount) => console.log(amount)}
/>

      <UsageCompareCard />

  

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
});
