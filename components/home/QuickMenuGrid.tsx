import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MENU_ITEMS = [
  "예산 설정",
  "지출 입력",
  "달력",
  "대시보드",
];

export default function QuickMenuGrid() {
  const router = useRouter();

  const handlePressMenu = (item: string) => {
    if (item === "예산 설정") {
      router.push("/budget");
    }

    if (item === "지출 입력") {
      router.push("/expense-input" as any);
    }
  };

  return (
    <View style={styles.menuContainer}>
      {MENU_ITEMS.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.menuButton}
          onPress={() => handlePressMenu(item)}
        >
          <Text style={styles.menuText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  menuButton: {
    width: "48%",
    aspectRatio: 1.15,
    backgroundColor: "#EEF0FF",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
});
