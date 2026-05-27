import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuickMenuGrid() {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuEmoji}>💸</Text>
        <Text style={styles.menuText}>예산 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuEmoji}>⭐</Text>
        <Text style={styles.menuText}>위시세이브</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuEmoji}>📋</Text>
        <Text style={styles.menuText}>내역 보기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  menuButton: {
    width: "31%",
    backgroundColor: "#EEF0FF",
    borderRadius: 22,
    paddingVertical: 24,
    alignItems: "center",
  },

  menuEmoji: {
    fontSize: 26,
    marginBottom: 10,
  },

  menuText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
  },
});