import { StyleSheet, Text, View } from "react-native";

type Props = {
  balance: number;
  monthlySpent: number;
};

export default function BalanceCard({ balance, monthlySpent }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>총 잔액</Text>

      <Text style={styles.balanceText}>₩{balance.toLocaleString()}</Text>

      <View style={styles.divider} />

      <Text style={styles.subLabel}>이번 달 사용 금액</Text>

      <Text style={styles.subAmount}>₩{monthlySpent.toLocaleString()}</Text>
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
