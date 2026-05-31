import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuickMenuGrid() {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuText}>예산 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuText}>지출 입력</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuText}>달력</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuText}>대시보드</Text>
      </TouchableOpacity>
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
