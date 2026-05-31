import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onSaveExpense: (amount: number) => void;
};

const TEXT = {
  title: "\uBE60\uB978 \uC9C0\uCD9C \uC785\uB825",
  placeholder: "\uAE08\uC561 \uC785\uB825",
  submit: "\uC785\uB825 \uC644\uB8CC",
  alertTitle: "\uC785\uB825 \uC624\uB958",
  alertMessage: "\uAE08\uC561\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.",
};

const CATEGORIES = [
  "\uC2DD\uBE44",
  "\uAD50\uD1B5",
  "\uC1FC\uD551",
  "\uCE74\uD398",
];

export default function QuickExpenseInput({ onSaveExpense }: Props) {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleSaveExpense = () => {
    const numericAmount = Number(amount);

    if (!amount || numericAmount <= 0) {
      Alert.alert(TEXT.alertTitle, TEXT.alertMessage);
      return;
    }

    onSaveExpense(numericAmount);

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
        onChangeText={setAmount}
      />

      <View style={styles.categoryContainer}>
        {CATEGORIES.map((category) => (
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
