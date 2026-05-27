import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BalanceCard from "@/components/home/BalanceCard";
import BudgetStatusCard from "@/components/home/BudgetStatusCard";
import QuickExpenseInput from "@/components/home/QuickExpenseInput";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>내 계좌</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingIcon}>🎀</Text>
        </TouchableOpacity>
      </View>

      {/* 잔액 카드 */}
      <BalanceCard />

      {/* 빠른 지출 입력 */}
      <QuickExpenseInput />

      {/* 예산 카드 */}
      <BudgetStatusCard />

      {/* 빠른 이동 */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuEmoji}>💸</Text>
          <Text style={styles.menuText}>예산 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuEmoji}>⭐</Text>
          <Text style={styles.menuText}>위시세이브</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuEmoji}>📋</Text>
          <Text style={styles.menuText}>내역 보기</Text>
        </TouchableOpacity>
      </View>
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

  settingButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  settingIcon: {
    fontSize: 30,
  },

  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  menuButton: {
    width: "31%",
    backgroundColor: "#EEF0FF",
    borderRadius: 22,
    paddingVertical: 24,
    alignItems: "center",
  },

  menuEmoji: {
    fontSize: 26,
    marginBottom: 10,
  },

  menuText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
  },
});