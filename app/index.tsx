import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import BalanceCard from "@/src/components/home/BalanceCard";
import BudgetStatusCard from "@/src/components/home/BudgetStatusCard";
import QuickExpenseInput from "@/src/components/home/QuickExpenseInput";
import QuickMenuGrid from "@/src/components/home/QuickMenuGrid";
import UsageCompareCard from "@/src/components/home/UsageCompareCard";

const TEXT = {
  appTitle: "\uB0B4 \uACC4\uC88C",
  settings: "\uC124\uC815",
};

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(0);
  const [wishName, setWishName] = useState("");
  const [wishPrice, setWishPrice] = useState("");
  const [wishList, setWishList] = useState([]);
  const [editingId, setEditingId] = useState(null); 

  const handleAddExpense = (amount: number) => {
    setMonthlySpent((prev) => prev + amount);
    setBalance((prev) => prev - amount);
  };
  const handleUpdateWish = (id, updatedFields) => {
  setWishList(wishList.map(item => 
    item.id === id ? { ...item, ...updatedFields } : item
  ));
};

const handleAddWish = () => {
  if (!wishName || !wishPrice) return;

  const newWish = {
    id: Date.now().toString(),
    name: wishName,
    price: Number(wishPrice),
  };

  setWishList((prev) => [newWish, ...prev]); 
  setWishName("");
  setWishPrice("");
  
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


      <View style={styles.purpleBox}>
        <Text style={styles.sectionTitle}>위시템 </Text>

      <View style={styles.inputRow}>
    <TextInput
      style={styles.input}
      placeholder="위시템 (예: 에어팟)"
      value={wishName}
      onChangeText={setWishName}
    />

    <TextInput
      style={styles.input}
      placeholder="가격"
      value={wishPrice}
      onChangeText={setWishPrice}
      keyboardType="numeric"
       />
  </View>


  <TouchableOpacity style={styles.addButton} onPress={handleAddWish}>
    <Text style={styles.addButtonText}>추가</Text>
  </TouchableOpacity>

  {wishList.map((item) => (
    <View key={item.id} style={styles.wishItem}>
      <Text style={styles.wishText}>
        {item.name} - {item.price.toLocaleString()}원
      </Text>
    </View>
    ))}

      <UsageCompareCard />
      <QuickMenuGrid />
      </View>
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

