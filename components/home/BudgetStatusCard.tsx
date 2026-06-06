import { StyleSheet, Text, View } from "react-native";

const TEXT = {
  title: "\uC774\uBC88 \uB2EC \uC608\uC0B0",
  unset: "\uC124\uC815\uB41C \uC608\uC0B0\uC774 \uC5C6\uC5B4\uC694",
};

type Props = {
  budget: number;
  spent: number;
};

export default function BudgetStatusCard({ budget, spent }: Props) {
  const progress = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{TEXT.title}</Text>

      <Text style={styles.budgetText}>
        {budget > 0 ? `\u20A9${budget.toLocaleString()} \uC911` : TEXT.unset}
      </Text>

      <Text style={styles.usedText}>{`\u20A9${spent.toLocaleString()} \uC0AC\uC6A9`}</Text>

      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
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
