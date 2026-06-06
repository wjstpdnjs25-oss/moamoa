import { StyleSheet, Text, View } from "react-native";

type Props = {
  achievementRate?: number | string;
  compliantDays?: number | string;
  dailyBudget?: number | string;
  evaluatedDays?: number | string;
  title?: string;
};

export default function WishSaveCard({
  achievementRate = 0,
  compliantDays = 0,
  dailyBudget = 0,
  evaluatedDays = 0,
  title = "",
}: Props) {
  const safeAchievementRate = Math.min(
    100,
    Math.max(0, Number(achievementRate ?? 0) || 0)
  );
  const safeCompliantDays = Number(compliantDays ?? 0) || 0;
  const safeDailyBudget = Number(dailyBudget ?? 0) || 0;
  const safeEvaluatedDays = Number(evaluatedDays ?? 0) || 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
        <Text style={styles.rate}>{safeAchievementRate}% 달성</Text>
      </View>

      <View style={styles.dailyBudgetBox}>
        <Text style={styles.dailyBudgetLabel}>위시를 위한 하루 예산</Text>
        <Text style={styles.dailyBudget}>
          {safeDailyBudget.toLocaleString()}원
        </Text>
        <Text style={styles.guide}>오늘은 이 금액 안에서 사용해보세요.</Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[styles.progressFill, { width: `${safeAchievementRate}%` }]}
        />
      </View>

      <Text style={styles.progressText}>
        하루 예산을 지킨 날 {safeCompliantDays}일 / 확인한 날{" "}
        {safeEvaluatedDays}일
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EEF0FF",
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  titleArea: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: "#22222A",
    fontSize: 20,
    fontWeight: "800",
  },
  rate: {
    color: "#5B21B6",
    fontSize: 15,
    fontWeight: "800",
  },
  dailyBudgetBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
  },
  dailyBudgetLabel: {
    color: "#666A7A",
    fontSize: 14,
    fontWeight: "700",
  },
  dailyBudget: {
    color: "#5B21B6",
    fontSize: 27,
    fontWeight: "900",
    marginTop: 6,
  },
  guide: {
    color: "#737687",
    fontSize: 13,
    marginTop: 5,
  },
  progressBackground: {
    backgroundColor: "#D9DDEF",
    borderRadius: 6,
    height: 12,
    marginTop: 18,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#5B21B6",
    borderRadius: 6,
    height: "100%",
  },
  progressText: {
    color: "#555A6C",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
  },
});
