import { useState } from "react";
import {
  Alert,
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

const PURPLE = "#7356E8";
const BORDER = "#E7E7EF";

export default function BudgetScreen() {
  const { budgets, setBudgetAmount } = useBudget();

  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [draftAmount, setDraftAmount] = useState("");

  const totalBudget = budgets.reduce((sum, item) => sum + item.amount, 0);

  const selectedBudget =
    budgets.find((item) => item.category === selectedCategory)?.amount ?? 0;

  const handleSelectCategory = (category: string) => {
    const currentAmount =
      budgets.find((item) => item.category === category)?.amount ?? 0;

    setSelectedCategory(category);
    setDraftAmount(currentAmount ? String(currentAmount) : "");
  };

  const handleSaveBudget = () => {
    setBudgetAmount(selectedCategory, Number(draftAmount || 0));

    Alert.alert(
      "저장 완료",
      '예산이 저장되었습니다.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
<<<<<<< HEAD
<<<<<<< HEAD
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>예산 설정</Text>
      <Text style={styles.subtitle}>
        카테고리별 예산을 설정해주세요.
      </Text>

        <View style={styles.illustrationWrap}>
          <View style={[styles.backCard, styles.leftBackCard]} />
          <View style={[styles.backCard, styles.rightBackCard]} />

          <View style={styles.bankCard}>
            <MaterialCommunityIcons name="credit-card-outline" size={38} color={DEEP_PURPLE} />
          </View>

          <View style={styles.moneyCard}>
            <MaterialCommunityIcons name="sack" size={56} color={DEEP_PURPLE} />
            <View style={styles.coin}>
              <Text style={styles.coinText}>$</Text>
            </View>
          </View>

          <View style={styles.securityCard}>
            <MaterialCommunityIcons name="shield-lock-outline" size={58} color={DEEP_PURPLE} />
          </View>

          <View style={styles.phone}>
            <View style={styles.phoneTop} />
            <View style={styles.phoneScreen}>
              <View style={styles.menuLine} />
              <View style={styles.accountBox}>
                <View style={styles.wonCircle}>
                  <Text style={styles.wonText}>모</Text>
                </View>
                <Text style={styles.accountText}>모아모아 계좌</Text>
              </View>
              <View style={styles.listRow}>
                <View style={styles.dot} />
                <View style={styles.longLine} />
              </View>
              <View style={styles.listRow}>
                <View style={styles.dot} />
                <View style={styles.midLine} />
              </View>
              <View style={styles.sendButton}>
                <Ionicons name="arrow-forward" size={17} color="#ffffff" />
                <Text style={styles.sendText}>전송</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.copy}>
          <Text style={styles.title}>모아모아와 함께하는 간편한 은행</Text>
          <Text style={styles.description}>
            흩어진 금융 생활을 모아, 나만의 계좌 관리를 시작해보세요.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={() => router.push('/login')}>
            <Text style={styles.primaryButtonText}>로그인하기</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => router.push('/signup')}>
            <Text style={styles.secondaryButtonText}>회원가입하기</Text>
          </Pressable>
=======
=======
      <KeyboardAvoidingView
      style={{ flex:1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
>>>>>>> d9bdc48 (fix: prevent keyboard from covering budget input)
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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
            .filter((expenses) => expenses.category === item.category)
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
      { width: `${Math.min(rate, 100)}%` as any },
    ]}
  />
</View>
              </TouchableOpacity>
            );
          })}
>>>>>>> 6a78f52 (style:: update budget category UI)
        </View>

<<<<<<< HEAD
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>카테고리별 예산</Text>

        {budgets.map((item) => (
          <TouchableOpacity
            key={item.category}
            style={[
              styles.categoryRow,
              selectedCategory === item.category && styles.selectedRow,
            ]}
            onPress={() => handleSelectCategory(item.category)}
          >
            <Text style={styles.categoryName}>{item.category}</Text>

            <View style={styles.rowRight}>
              <Text style={styles.categoryAmount}>
                ₩ {item.amount.toLocaleString()}
              </Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          {selectedCategory} 예산 설정
        </Text>
=======
        <View style={styles.editCard}>
          <Text style={styles.editTitle}>{selectedCategory} 예산</Text>
>>>>>>> 6a78f52 (style:: update budget category UI)

          <View style={styles.inputBox}>
            <Text style={styles.currency}>₩</Text>
            <TextInput
              style={styles.input}
              placeholder="예:100000"
              placeholderTextColor="#B8B8B8"
              keyboardType="numeric"
              value={draftAmount}
              onChangeText={(text) =>
                setDraftAmount(text.replace(/[^0-9]/g, ""))
              }
            />
          </View>

          <Text style={styles.currentText}>
            현재 설정 금액 ₩ {selectedBudget.toLocaleString()}
          </Text>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveBudget}>
            <Text style={styles.saveButtonText}>저장하기</Text>
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
    padding: 22,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#101014",
    marginTop: 20,
    marginBottom: 12,
  },
  subtitle: {
<<<<<<< HEAD
    fontSize: 16,
=======
    marginBottom: 26,
>>>>>>> 6a78f52 (style:: update budget category UI)
    color: "#747783",
    marginBottom: 24,
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 12,
  },
  summaryAmount: {
    fontSize: 34,
    fontWeight: "800",
    color: PURPLE,
  },
  card: {
    borderWidth: 1,
    borderColor: BORDER,
<<<<<<< HEAD
    borderRadius: 16,
=======
    borderRadius: 14,
>>>>>>> 6a78f52 (style:: update budget category UI)
    padding: 18,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
<<<<<<< HEAD
    color: "#111111",
    marginBottom: 16,
  },
  categoryRow: {
    minHeight: 58,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
=======
    marginBottom: 12,
  },
  budgetRow: {
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
>>>>>>> 6a78f52 (style:: update budget category UI)
    backgroundColor: "#F8F7FC",
  },
<<<<<<< HEAD
  selectedRow: {
    borderWidth: 1.5,
    borderColor: PURPLE,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: PURPLE,
  },
  arrow: {
    fontSize: 26,
    color: "#A0A3AD",
=======
  selectedBudgetRow: {
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 1.5,
    borderColor: PURPLE,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTop:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  editTitle: {
    color: "#111111",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 18,
>>>>>>> 6a78f52 (style:: update budget category UI)
  },
  inputBox: {
<<<<<<< HEAD
    height: 64,
=======
    height: 50,
>>>>>>> cfbff36 (style: improve budget input section)
    borderWidth: 1,
    borderColor: "#E3E3EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFDFF",
    marginBottom: 12,
  },
  currency: {
<<<<<<< HEAD
    fontSize: 24,
    fontWeight: "800",
    color: "#C7C9D1",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 22,
    fontWeight: "800",
    color: PURPLE,
=======
    fontSize: 16,
    fontWeight: "600",
    color: "#A0A0A0",
    marginRight: 4,
  },
  input: {
    flex: 1,
    color: "#111111",
    fontSize: 18,
    fontWeight: "500",
<<<<<<< HEAD
>>>>>>> cfbff36 (style: improve budget input section)
=======
  },
  progressBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#EAEAEA",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: PURPLE,
>>>>>>> 433b5fd (feat: add category budget usage bar)
  },
  currentText: {
    fontSize: 14,
    color: "#747783",
    marginBottom: 18,
  },
  saveButton: {
    minHeight: 56,
    borderRadius: 12,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
});