import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MENU_ITEMS = [
  "\uC608\uC0B0 \uC124\uC815",
  "\uC9C0\uCD9C \uC785\uB825",
  "\uB2EC\uB825",
  "\uB300\uC2DC\uBCF4\uB4DC",
];

export default function QuickMenuGrid() {
  return (
    <View style={styles.menuContainer}>
      {MENU_ITEMS.map((item) => (
        <TouchableOpacity key={item} style={styles.menuButton}>
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
