import { StyleSheet, Text, View } from "react-native";

type Props = {
  balance: number;
  monthlySpent: number;
};

const TEXT = {
  balanceLabel: "\uCD1D \uC794\uC561",
  monthlySpentLabel: "\uC774\uBC88 \uB2EC \uC0AC\uC6A9 \uAE08\uC561",
  won: "\u20A9",
};

export default function BalanceCard({ balance, monthlySpent }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{TEXT.balanceLabel}</Text>

      <Text style={styles.balanceText}>
        {TEXT.won}
        {balance.toLocaleString()}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.subLabel}>{TEXT.monthlySpentLabel}</Text>

      <Text style={styles.subAmount}>
        {TEXT.won}
        {monthlySpent.toLocaleString()}
      </Text>
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
});
