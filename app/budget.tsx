import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
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

  const [savedFood, setSavedFood] = useState(0);
  const [savedTransport, setSavedTransport] = useState(0);
  const [savedShopping, setSavedShopping] = useState(0);
  const [savedCafe, setSavedCafe] = useState(0);

  const [foodSaved, setFoodSaved] = useState(false);
  const [transportSaved, setTransportSaved] = useState(false);
  const [shoppingSaved, setShoppingSaved] = useState(false);
  const [cafeSaved, setCafeSaved] = useState(false);

  const foodInputRef = useRef<TextInput>(null);
  const transportInputRef = useRef<TextInput>(null);
  const shoppingInputRef = useRef<TextInput>(null);
  const cafeInputRef = useRef<TextInput>(null);

  const totalBudget =
    savedFood + savedTransport + savedShopping + savedCafe;

  return (
    <KeyboardAvoidingView
    style={styles.wrapper}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView 
    style={styles.container}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ paddingBottom: 130 }}
        >
      <Text style={styles.title}>예산 설정</Text>

      <View style={styles.card}>
        <Text style={styles.label}>카테고리별 예산</Text>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>식비</Text>
          <TextInput
          ref={foodInputRef}
            placeholder="예산 입력"
            style={[
                styles.input,
                foodSaved && styles.savedInput,]}
            keyboardType="numeric"
            value={food}
            onChangeText={setFood}
            editable={!foodSaved}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setSavedFood(Number(food || 0));
                setFoodSaved(true);
              }}
            >
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setFoodSaved(false);
            
                setTimeout(() => {
                    foodInputRef.current?.focus();
                }, 50);
              }}
            >
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>교통</Text>
          <TextInput
          ref={transportInputRef}
            placeholder="예산 입력"
            style={[
                styles.input,
                transportSaved && styles.savedInput,]}
            keyboardType="numeric"
            value={transport}
            onChangeText={setTransport}
            editable={!transportSaved}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setSavedTransport(Number(transport || 0));
                setTransportSaved(true);
              }}
            >
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setTransportSaved(false)
             setTimeout(() => {
                    transportInputRef.current?.focus();
                }, 50);
              }}
            >
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>쇼핑</Text>
          <TextInput
          ref={shoppingInputRef}
            placeholder="예산 입력"
            style={[
                styles.input,
                shoppingSaved && styles.savedInput,]}
            keyboardType="numeric"
            value={shopping}
            onChangeText={setShopping}
            editable={!shoppingSaved}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setSavedShopping(Number(shopping || 0));
                setShoppingSaved(true);
              }}
            >
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setShoppingSaved(false)
             setTimeout(() => {
                    shoppingInputRef.current?.focus();
                }, 50);
              }}
            >
              <Text style={styles.smallButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryLabel}>카페</Text>
          <TextInput
          ref={cafeInputRef}
            placeholder="예산 입력"
            style={
                [styles.input,
                cafeSaved && styles.savedInput,
            ]}
            keyboardType="numeric"
            value={cafe}
            onChangeText={setCafe}
            editable={!cafeSaved}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setSavedCafe(Number(cafe || 0));
                setCafeSaved(true);
              }}
            >
              <Text style={styles.smallButtonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setCafeSaved(false)
             setTimeout(() => {
                    cafeInputRef.current?.focus();
                }, 50);
              }}
            >
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
    </KeyboardAvoidingView>

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
    color: "#111111",
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
  savedInput: {
    backgroundColor: "#E5E5E5",
    color: "#777777",
  },
  wrapper: {
    flex: 1,
  }
});
