import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
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

import {
  DEFAULT_CATEGORIES,
  useBudget,
} from "../../../contexts/BudgetContext";
import { useExpense } from "../../../contexts/ExpenseContext";

const PURPLE = "#7356E8";
const LIGHT_PURPLE = "#F4F1FF";
const BORDER = "#E7E7EF";

export default function BudgetScreen() {
  const router = useRouter();
  const { budgets, setBudgetAmount } = useBudget();
  const { expenses } = useExpense();

  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [draftAmount, setDraftAmount] = useState("");

  const getProgressColor = (rate: number) => {
    if (rate >= 100) return "#FF3B30";
    if (rate >= 80) return "#FF9500";
    if (rate >= 50) return "#FFD60A";
    return "#34C759";
  };

  const ScrollViewRef = useRef<ScrollView>(null);

  const totalBudget = budgets.reduce((sum, item) => sum + item.amount, 0);

  const selectedBudget =
    budgets.find((item) => item.category === selectedCategory)?.amount ?? 0;

  const handleSelectCategory = (category: string) => {
    const currentAmount =
      budgets.find((item) => item.category === category)?.amount ?? 0;

    setSelectedCategory(category);
    setDraftAmount(currentAmount ? String(currentAmount) : "");

    setTimeout(() => {
      ScrollViewRef.current?.scrollToEnd({ animated: true});
    }, 100);
  };

  const handleSaveBudget = () => {
    const amount = Number(draftAmount || 0);

    if (amount <= 0) {
      Alert.alert("입력 오류", "1원 이상 입력해주세요.");
      return;
    }
    setBudgetAmount(selectedCategory, Number(draftAmount || 0));
    setDraftAmount("");
    Keyboard.dismiss();

    Alert.alert(
      "저장 완료",
      `${selectedCategory} 예산이 저장되었습니다.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.KeyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
      <ScrollView
        ref={ScrollViewRef} 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={42}
              color="#111111"
            />
          </TouchableOpacity>

          <Text style={styles.title}>예산 설정</Text>
        </View>

        <Text style={styles.subtitle}>카테고리별 예산을 설정해주세요.</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>이번 달 총 예산</Text>
          <Text style={styles.summaryAmount}>
            ₩ {totalBudget.toLocaleString()}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>카테고리별 예산</Text>

          {budgets.map((item) => {
            const selected = selectedCategory === item.category;

            const spent = expenses
              .filter((expense) => expense.category === item.category)
              .reduce((sum, expense) => sum + expense.amount, 0);

            const rate =
              item.amount === 0 ? 0 : Math.round((spent / item.amount) * 100);

            return (
              <TouchableOpacity
                key={item.category}
                style={[styles.budgetRow, selected && styles.selectedBudgetRow]}
                onPress={() => handleSelectCategory(item.category)}
              >
                <View style={styles.rowTop}>
  <View style={styles.rowLeft}>
    <View
      style={[
        styles.categoryDot,
        selected && styles.selectedCategoryDot,
      ]}
    />
    <Text
      style={[
        styles.categoryName,
        selected && styles.selectedCategoryName,
      ]}
    >
      {item.category}
    </Text>
  </View>

  <Text
    style={[
      styles.categoryAmount,
      selected && styles.selectedCategoryAmount,
    ]}
  >
    ₩ {item.amount.toLocaleString()}
  </Text>
</View>

<Text style={styles.rowUsageText}>
  사용 ₩ {spent.toLocaleString()} · {rate}%
</Text>

<View style={styles.progressBackground}>
  <View
    style={[
      styles.progressBar,
      { width: `${Math.min(rate, 100)}%`,
        backgroundColor: getProgressColor(rate),
      },
    ]}
  />
</View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.editCard}>
          <Text style={styles.editTitle}>{selectedCategory} 예산</Text>

          <View style={styles.inputBox}>
            <Text style={styles.currency}>₩</Text>
            <TextInput
              style={styles.input}
              placeholder="예산을 입력하세요"
              keyboardType="numeric"
              value={
                draftAmount
                ? Number(draftAmount).toLocaleString("ko-KR")
                : ""
              }
              onChangeText={(text) =>{
                const numericValue = text.replace(/[0-9]/g, "")
                setDraftAmount(text.replace(/[^0-9]/g, ""))
              }}
              selectTextOnFocus={true}
            />
          </View>

          <Text style={styles.currentText}>
            현재 설정 금액 ₩ {selectedBudget.toLocaleString()}
          </Text>

          <TouchableOpacity 
            style={[
              styles.saveButton,
              !draftAmount && styles.disabledButton,
            ]}
            onPress={handleSaveBudget}
            disabled={!draftAmount}
            activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>
              {selectedBudget > 0 ? "수정하기" : "저장하기"}
              </Text>
          </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 42,
  },
  header: {
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  backButton: {
    position: "absolute",
    left: -10,
    width: 52,
    height: 52,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#101014",
  },
  subtitle: {
    marginBottom: 26,
    color: "#747783",
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 12,
  },
  summaryAmount: {
    fontSize: 38,
    fontWeight: "800",
    color: PURPLE,
    letterSpacing: 0.5,
  },
  card: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    color: "#111111",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
  budgetRow: {
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
    backgroundColor: "#F8F7FC",
  },
  selectedBudgetRow: {
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 1.5,
    borderColor: PURPLE,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowTop:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rowUsageText:{
    fontSize: 12,
    color: "#666666",
    marginBlock: 6,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#D7D3E8",
  },
  selectedCategoryDot: {
    width: 10,
    height: 10,
    backgroundColor: PURPLE,
  },
  categoryName: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "700",
  },
  selectedCategoryName: {
    color: PURPLE,
  },
  categoryAmount: {
    color: "#747783",
    fontSize: 15,
    fontWeight: "700",
  },
  selectedCategoryAmount: {
    color: PURPLE,
  },
  editCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  editTitle: {
    color: "#111111",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 18,
  },
  inputBox: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E3E3EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFDFF",
    marginBottom: 16,
  },
  currency: {
    fontSize: 16,
    fontWeight: "500",
    color: "#A0A0A0",
    marginRight: 4,
  },
  input: {
    flex: 1,
    color: "#111111",
    fontSize: 18,
    fontWeight: "500",
  },
  progressBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#EAEAEA",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: PURPLE,
  },
  currentText: {
    color: "#747783",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  saveButton: {
    minHeight: 60,
    borderRadius: 10,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  disabledButton: {
    backgroundColor: "#C7C7CC",
  }
});
