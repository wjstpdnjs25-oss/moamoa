import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function QuickExpenseInput() {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("식비");

  const categories = ["식비", "교통", "쇼핑", "카페"];

  const handleSaveExpense = () => {
    const numericAmount = Number(amount);

    if (!amount || numericAmount <= 0) {
      Alert.alert("입력 오류", "금액을 입력해주세요.");
      return;
    }

    setAmount("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>빠른 지출 입력</Text>

      <TextInput
        placeholder="금액 입력"
        placeholderTextColor="#8A8A8A"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.inputButton} onPress={handleSaveExpense}>
        <Text style={styles.inputButtonText}>입력 완료</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EEF0FF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 18,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  selectedCategoryChip: {
    backgroundColor: "#DDE2FF",
  },
  categoryChipText: {
    color: "#666666",
    fontSize: 14,
  },
  selectedCategoryText: {
    color: "#3D5AFE",
    fontWeight: "700",
  },
  inputButton: {
    backgroundColor: "#DDE2FF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  inputButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3D5AFE",
  },
});