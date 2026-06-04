import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEXT = {
  title: "예산이 초과되었어요",
  subtitleFirst: "설정해둔 예산을 초과했어요.",
  subtitleSecond: "지출 내역을 확인해보세요.",
  budget: "예산",
  spent: "지출",
  exceeded: "초과 금액",
  won: "원",
};

function formatWon(value: number) {
  return `${Math.max(0, value).toLocaleString()}${TEXT.won}`;
}

export default function BudgetAlertScreen() {
  const budget = 500000;
  const spent = 562300;
  const exceededAmount = Math.max(0, spent - budget);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{TEXT.title}</Text>
          <Text style={styles.subtitle}>{TEXT.subtitleFirst}</Text>
          <Text style={styles.subtitle}>{TEXT.subtitleSecond}</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{TEXT.budget}</Text>
            <Text style={styles.budgetAmount}>{formatWon(budget)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.spentLabel]}>
              {TEXT.spent}
            </Text>
            <Text style={styles.spentAmount}>{formatWon(spent)}</Text>
          </View>
        </View>

        <Text style={styles.exceededText}>
          {TEXT.exceeded}{" "}
          <Text style={styles.exceededAmount}>{formatWon(exceededAmount)}</Text>
        </Text>
      </View>
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
    justifyContent: "center",
    paddingHorizontal: 23,
    paddingBottom: 34,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    marginBottom: 68,
  },
  title: {
    marginBottom: 26,
    color: "#26262D",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 38,
    textAlign: "center",
  },
  subtitle: {
    color: "#5D5D66",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 30,
    textAlign: "center",
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: "#ECECF2",
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 35,
    backgroundColor: "#FFFFFF",
  },
  summaryRow: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  summaryLabel: {
    color: "#666671",
    fontSize: 18,
    fontWeight: "700",
  },
  spentLabel: {
    color: "#7C5CE6",
  },
  budgetAmount: {
    flexShrink: 1,
    color: "#2E2E35",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "right",
  },
  spentAmount: {
    flexShrink: 1,
    color: "#7C5CE6",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "right",
  },
  divider: {
    height: 1,
    marginVertical: 29,
    backgroundColor: "#ECECF2",
  },
  exceededText: {
    marginTop: 30,
    color: "#7C5CE6",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 28,
    textAlign: "center",
  },
  exceededAmount: {
    fontWeight: "800",
  },
});
