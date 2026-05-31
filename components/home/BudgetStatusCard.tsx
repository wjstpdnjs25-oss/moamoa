import { StyleSheet, Text, View } from "react-native";

const TEXT = {
  title: "\uC774\uBC88 \uB2EC \uC608\uC0B0",
  budget: "\u20A90 \uC911",
  used: "\u20A90 \uC0AC\uC6A9",
};

export default function BudgetStatusCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{TEXT.title}</Text>

      <Text style={styles.budgetText}>{TEXT.budget}</Text>

      <Text style={styles.usedText}>{TEXT.used}</Text>

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
