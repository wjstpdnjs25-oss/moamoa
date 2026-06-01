import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function BudgetScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>예산 설정</Text>


      <View style={styles.card}>
        <Text style={styles.label}>카테고리별 예산</Text>

        <TextInput placeholder="식비" style={styles.input} />
        <TextInput placeholder="교통" style={styles.input} />
        <TextInput placeholder="쇼핑" style={styles.input} />
        <TextInput placeholder="카페" style={styles.input} />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
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
    padding: 20,
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: "#DDE2FF",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#3D5AFE",
    fontWeight: "700",
    fontSize: 16,
  },
});