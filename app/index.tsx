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
  const [editingId, setEditingId] = useState(null); 
  const [wishList, setWishList] = useState([]);

  const handleAddExpense = (amount: number) => {
    setMonthlySpent((prev) => prev + amount);
    setBalance((prev) => prev - amount);
  };

  const handleAddWish = (item) => {
  setWishList((prev) => [...prev, item]);
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


            <BudgetStatusCard />

      
      <WishSaveCard
        isInput={true}
        onSave={(amount, title, targetAmount) => {
          handleAddWish({
            id: Date.now(),
            title: title || "새 위시 아이템",
            targetAmount: Number(targetAmount) || 0,
            savedAmount: Number(amount) || 0,
          });
        }}
      />

      {wishList.map((item) => (
        <WishSaveCard
          key={item.id}
          title={item.title}
          targetAmount={item.targetAmount}
          savedAmount={item.savedAmount}
          // 여기에 저축 기능이나 삭제 기능이 동작하도록 추후 연결 예정입니다.
          onDelete={() => {
            setWishList((prev) => prev.filter((wish) => wish.id !== item.id));
          }}
          onSave={(amount) => {
            setWishList((prev) =>
              prev.map((wish) =>
                wish.id === item.id
                  ? { ...wish, savedAmount: wish.savedAmount + amount }
                  : wish
              )
            );
          }}
        />
      ))}

      <UsageCompareCard />


      <UsageCompareCard />

      <QuickMenuGrid />


  </ScrollView>
);
  

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3, 
  
},
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
    color: '#333',
  },
  addButton: {
    backgroundColor: "#EEF0FF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#3D5AFE',
    fontWeight: '700',
    fontSize: 16,
  },
  wishItem: {
  marginTop: 10,
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
},

  wishText: {
    fontSize: 14,
},
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  editContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  editButton: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  editButtonText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  targetText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

