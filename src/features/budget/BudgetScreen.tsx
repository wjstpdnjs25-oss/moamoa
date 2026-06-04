import { useState } from "react";
import {
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
        </View>
      </View>

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

        <View style={styles.inputBox}>
          <Text style={styles.currency}>₩</Text>
          <TextInput
            style={styles.input}
            placeholder="예산 금액 입력"
            keyboardType="numeric"
            value={draftAmount}
            onChangeText={(text) => setDraftAmount(text.replace(/[^0-9]/g, ""))}
          />
        </View>

        <Text style={styles.currentText}>
          현재 예산: ₩ {selectedBudget.toLocaleString()}
        </Text>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveBudget}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
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
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 16,
  },
  categoryRow: {
    minHeight: 58,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    backgroundColor: "#F8F7FC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  },
  inputBox: {
    height: 64,
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
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  }
});
