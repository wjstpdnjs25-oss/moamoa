import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function BudgetScreen() {
  const [food, setFood] = useState("");
  const [transport, setTransport] = useState("");
  const [shopping, setShopping] = useState("");
  const [cafe, setCafe] = useState("");

  const totalBudget =
    Number(food || 0) +
    Number(transport || 0) +
    Number(shopping || 0) +
    Number(cafe || 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>예산 설정</Text>

      <View style={styles.card}>
        <Text style={styles.label}>카테고리별 예산</Text>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>식비</Text>
          <TextInput
            placeholder="예산 입력"
            style={styles.input}
            keyboardType="numeric"
            value={food}
            onChangeText={setFood}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>교통</Text>
          <TextInput
            placeholder="예산 입력"
            style={styles.input}
            keyboardType="numeric"
            value={transport}
            onChangeText={setTransport}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>쇼핑</Text>
          <TextInput
            placeholder="예산 입력"
            style={styles.input}
            keyboardType="numeric"
            value={shopping}
            onChangeText={setShopping}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>카페</Text>
          <TextInput
            placeholder="예산 입력"
            style={styles.input}
            keyboardType="numeric"
            value={cafe}
            onChangeText={setCafe}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>총 예산</Text>
        <Text style={styles.totalBudgetText}>
          ₩ {totalBudget.toLocaleString()}
        </Text>
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
    padding: 20,
    marginBottom: 18,
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111111",
  },
  categoryBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222222",
  },
  input: {
    backgroundColor: "#F7F7FB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  smallButton: {
    backgroundColor: "#DDE2FF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  smallButtonText: {
    color: "#3D5AFE",
    fontWeight: "700",
  },
  totalBudgetText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111111",
    marginTop: 8,
  },
});