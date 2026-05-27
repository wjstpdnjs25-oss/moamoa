import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
          <Text style={styles.settingIcon}>⚙︎</Text>
        </TouchableOpacity>
      </View>

      {/* 잔액 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>총 잔액</Text>

        <Text style={styles.balanceText}>₩ 0</Text>

        <View style={styles.divider} />

        <Text style={styles.subLabel}>이번 달 사용 금액</Text>

        <Text style={styles.subAmount}>₩ 0</Text>
      </View>

      {/* 빠른 입력 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>빠른 지출 입력</Text>

        <TextInput
          placeholder="금액 입력"
          placeholderTextColor="#8A8A8A"
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>카테고리 선택</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputButton}>
          <Text style={styles.inputButtonText}>입력 완료</Text>
        </TouchableOpacity>
      </View>

      {/* 예산 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>이번 달 예산</Text>

        <Text style={styles.budgetText}>₩ 0 중</Text>

        <Text style={styles.usedText}>₩ 0 사용</Text>

        <View style={styles.progressBackground}>
          <View style={styles.progressFill} />
        </View>
      </View>

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
    fontSize: 50,
    color: "#444444",
  },

  card: {
    backgroundColor: "#EEF0FF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },

  cardLabel: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 16,
  },

  balanceText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 22,
  },

  divider: {
    height: 1,
    backgroundColor: "#DADDED",
    marginBottom: 18,
  },

  subLabel: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 8,
  },

  subAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
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

  categoryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  categoryText: {
    color: "#666666",
    fontSize: 15,
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

  budgetText: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 10,
  },

  usedText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 18,
  },

  progressBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#DADDED",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    width: "0%",
    height: "100%",
    backgroundColor: "#3D5AFE",
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
