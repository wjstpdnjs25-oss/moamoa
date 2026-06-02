import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>설정</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.menuItem}>
          <View>
            <Text style={styles.menuTitle}>카테고리 관리</Text>
            <Text style={styles.menuSubtitle}>지출 카테고리를 추가하거나 삭제해요</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View>
            <Text style={styles.menuTitle}>알림 설정</Text>
            <Text style={styles.menuSubtitle}>예산 및 지출 알림을 관리해요</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View>
            <Text style={styles.menuTitle}>로그아웃</Text>
            <Text style={styles.menuSubtitle}>현재 계정에서 로그아웃해요</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
    padding: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
    color: "#111111",
  },
  card: {
    backgroundColor: "#EEF0FF",
    borderRadius: 24,
    padding: 8,
  },
  menuItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
  },
  menuSubtitle: {
    fontSize: 13,
    color: "#777777",
  },
  arrow: {
    fontSize: 28,
    color: "#777777",
  },
});
