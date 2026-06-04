import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEXT = {
  title: "예산이 초과되었어요",
  subtitleFirst: "설정해둔 예산을 초과했어요.",
  subtitleSecond: "지출 내역을 확인해보세요.",
};

export default function BudgetAlertScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{TEXT.title}</Text>
          <Text style={styles.subtitle}>{TEXT.subtitleFirst}</Text>
          <Text style={styles.subtitle}>{TEXT.subtitleSecond}</Text>
        </View>
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
});
