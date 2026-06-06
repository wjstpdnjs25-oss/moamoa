import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  EXPENSE_CATEGORIES,
  QUICK_EXPENSE_CATEGORIES,
} from "@/src/constants/expense";

type Props = {
  onSaveExpense: (amount: number, category: string) => Promise<void> | void;
};

const TEXT = {
  title: "빠른 지출 입력",
  placeholder: "금액 입력",
  submit: "입력 완료",
  showMore: "더보기",
  hideMore: "접기",
  alertTitle: "입력 오류",
  alertMessage: "금액을 입력해주세요.",
};

const CATEGORIES = EXPENSE_CATEGORIES.map((category) => category.label);
const MAIN_CATEGORIES = QUICK_EXPENSE_CATEGORIES;

export default function QuickExpenseInput({ onSaveExpense }: Props) {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(MAIN_CATEGORIES[0]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const visibleCategories = showAllCategories ? CATEGORIES : MAIN_CATEGORIES;

  const handleSaveExpense = async () => {
    const numericAmount = Number(amount);

    if (!amount || numericAmount <= 0) {
      Alert.alert(TEXT.alertTitle, TEXT.alertMessage);
      return;
    }

    await onSaveExpense(numericAmount, selectedCategory);
    setAmount("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{TEXT.title}</Text>

      <TextInput
        placeholder={TEXT.placeholder}
        placeholderTextColor="#8A8A8A"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
      />

      <View style={styles.categoryContainer}>
        {visibleCategories.map((category) => (
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

        <TouchableOpacity
          style={styles.moreChip}
          onPress={() => setShowAllCategories((prev) => !prev)}
        >
          <Text style={styles.moreChipText}>
            {showAllCategories ? TEXT.hideMore : TEXT.showMore}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.inputButton} onPress={handleSaveExpense}>
        <Text style={styles.inputButtonText}>{TEXT.submit}</Text>
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

  moreChip: {
    backgroundColor: "#F4F1FF",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#DDE2FF",
  },

  moreChipText: {
    color: "#3D5AFE",
    fontSize: 14,
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
