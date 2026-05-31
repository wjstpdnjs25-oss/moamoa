import { StyleSheet, Text, View } from "react-native";

export default function BudgetStatusCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>이번 달 예산</Text>

      <Text style={styles.budgetText}>₩ 0 중</Text>

      <Text style={styles.usedText}>₩ 0 사용</Text>

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>
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
});
