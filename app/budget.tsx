import { useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useBudget } from "@/contexts/BudgetContext";

export default function BudgetScreen() {
  const { budgets, setBudgetAmount } = useBudget();
  const foodInputRef = useRef<TextInput>(null);
  const transportInputRef = useRef<TextInput>(null);
  const shoppingInputRef = useRef<TextInput>(null);
  const cafeInputRef = useRef<TextInput>(null);

  const [food, setFood] = useState(budgets.food ? String(budgets.food) : "");
  const [transport, setTransport] = useState(
    budgets.transport ? String(budgets.transport) : "",
  );
  const [shopping, setShopping] = useState(
    budgets.shopping ? String(budgets.shopping) : "",
  );
  const [cafe, setCafe] = useState(budgets.cafe ? String(budgets.cafe) : "");

  const [savedFood, setSavedFood] = useState(budgets.food);
  const [savedTransport, setSavedTransport] = useState(budgets.transport);
  const [savedShopping, setSavedShopping] = useState(budgets.shopping);
  const [savedCafe, setSavedCafe] = useState(budgets.cafe);

  const [foodSaved, setFoodSaved] = useState(budgets.food > 0);
  const [transportSaved, setTransportSaved] = useState(budgets.transport > 0);
  const [shoppingSaved, setShoppingSaved] = useState(budgets.shopping > 0);
  const [cafeSaved, setCafeSaved] = useState(budgets.cafe > 0);

  const totalBudget = savedFood + savedTransport + savedShopping + savedCafe;

  const focusInput = (ref: React.RefObject<TextInput | null>) => {
    setTimeout(() => {
      ref.current?.focus();
    }, 50);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 250 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>예산 설정</Text>

      <View style={styles.card}>
        <Text style={styles.label}>카테고리별 예산</Text>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>식비</Text>
          <TextInput
            ref={foodInputRef}
            placeholder="예산 입력"
            style={[styles.input, foodSaved && styles.savedInput]}
            keyboardType="numeric"
            value={food}
            onChangeText={setFood}
            editable={!foodSaved}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.smallButton, foodSaved && styles.disabledButton]}
              disabled={foodSaved}
              onPress={() => {
                const amount = Number(food || 0);
                setSavedFood(amount);
                setBudgetAmount("food", amount);
                setFoodSaved(true);
              }}
            >
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setFoodSaved(false);
                focusInput(foodInputRef);
              }}
            >
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
          {foodSaved && <Text style={styles.savedText}>저장됨 ✓</Text>}
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>교통</Text>
          <TextInput
            ref={transportInputRef}
            placeholder="예산 입력"
            style={[styles.input, transportSaved && styles.savedInput]}
            keyboardType="numeric"
            value={transport}
            onChangeText={setTransport}
            editable={!transportSaved}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.smallButton,
                transportSaved && styles.disabledButton,
              ]}
              disabled={transportSaved}
              onPress={() => {
                const amount = Number(transport || 0);
                setSavedTransport(amount);
                setBudgetAmount("transport", amount);
                setTransportSaved(true);
              }}
            >
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setTransportSaved(false);
                focusInput(transportInputRef);
              }}
            >
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
          {transportSaved && <Text style={styles.savedText}>저장됨 ✓</Text>}
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>쇼핑</Text>
          <TextInput
            ref={shoppingInputRef}
            placeholder="예산 입력"
            style={[styles.input, shoppingSaved && styles.savedInput]}
            keyboardType="numeric"
            value={shopping}
            onChangeText={setShopping}
            editable={!shoppingSaved}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.smallButton,
                shoppingSaved && styles.disabledButton,
              ]}
              disabled={shoppingSaved}
              onPress={() => {
                const amount = Number(shopping || 0);
                setSavedShopping(amount);
                setBudgetAmount("shopping", amount);
                setShoppingSaved(true);
              }}
            >
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setShoppingSaved(false);
                focusInput(shoppingInputRef);
              }}
            >
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
          {shoppingSaved && <Text style={styles.savedText}>저장됨 ✓</Text>}
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>카페</Text>
          <TextInput
            ref={cafeInputRef}
            placeholder="예산 입력"
            style={[styles.input, cafeSaved && styles.savedInput]}
            keyboardType="numeric"
            value={cafe}
            onChangeText={setCafe}
            editable={!cafeSaved}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.smallButton, cafeSaved && styles.disabledButton]}
              disabled={cafeSaved}
              onPress={() => {
                const amount = Number(cafe || 0);
                setSavedCafe(amount);
                setBudgetAmount("cafe", amount);
                setCafeSaved(true);
              }}
            >
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setCafeSaved(false);
                focusInput(cafeInputRef);
              }}
            >
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
          {cafeSaved && <Text style={styles.savedText}>저장됨 ✓</Text>}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>총 예산</Text>
        <Text style={styles.totalBudgetText}>
          ₩ {totalBudget.toLocaleString()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
    padding: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
    color: "#111111",
  },
  card: {
    backgroundColor: "#EEF0FF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111111",
  },
  categoryBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222222",
  },
  input: {
    backgroundColor: "#F7F7FB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    color: "#111111",
  },
  savedInput: {
    backgroundColor: "#E5E5E5",
    color: "#777777",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  smallButton: {
    backgroundColor: "#DDE2FF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  smallButtonText: {
    color: "#3D5AFE",
    fontWeight: "700",
  },
  savedText: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    textAlign: "right",
  },
  totalBudgetText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111111",
    marginTop: 8,
  },
});
