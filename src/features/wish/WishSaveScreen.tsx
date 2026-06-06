import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useBudget } from "../../../contexts/BudgetContext";
import { useWish } from "../../../contexts/WishContext";

export default function WishSaveScreen() {
  const router = useRouter();
  const { budgets } = useBudget();
  const { saveWishPlan, wishPlan } = useWish();
  const [title, setTitle] = useState(wishPlan?.title ?? "");
  const [targetAmount, setTargetAmount] = useState(
    wishPlan ? String(wishPlan.targetAmount) : ""
  );
  const [durationDays, setDurationDays] = useState(
    wishPlan ? String(wishPlan.durationDays) : ""
  );

  const totalBudget = useMemo(
    () => budgets.reduce((sum, item) => sum + item.amount, 0),
    [budgets]
  );
  const numericTarget = Number(targetAmount);
  const numericDuration = Number(durationDays);
  const dailyBudget =
    numericDuration > 0
      ? Math.max(0, Math.floor((totalBudget - numericTarget) / numericDuration))
      : 0;

  const handleSave = async () => {
    if (
      !title.trim() ||
      !Number.isFinite(numericTarget) ||
      numericTarget <= 0 ||
      !Number.isInteger(numericDuration) ||
      numericDuration <= 0
    ) {
      Alert.alert("입력 확인", "위시템, 가격, 모으는 기간을 모두 입력해주세요.");
      return;
    }

    await saveWishPlan({
      title: title.trim(),
      targetAmount: numericTarget,
      durationDays: numericDuration,
    });
    Alert.alert("저장 완료", "위시 계획이 메인 화면에 반영되었어요.", [
      {
        text: "확인",
        onPress: () => router.replace("/main"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.safeArea}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="chevron-left" size={38} color="#22222A" />
            </TouchableOpacity>
            <Text style={styles.title}>위시세이브 계획</Text>
          </View>

          <Text style={styles.description}>
            사고 싶은 위시템과 기간을 입력하면 하루 사용 가능 예산을 계산해드려요.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>위시템</Text>
            <TextInput
              onChangeText={setTitle}
              placeholder="예: 에어팟 프로"
              style={styles.input}
              value={title}
            />

            <Text style={styles.label}>위시템 가격</Text>
            <TextInput
              keyboardType="number-pad"
              onChangeText={(value) => setTargetAmount(value.replace(/[^0-9]/g, ""))}
              placeholder="가격 입력"
              style={styles.input}
              value={targetAmount}
            />

            <Text style={styles.label}>모으는 기간</Text>
            <View style={styles.durationRow}>
              <TextInput
                keyboardType="number-pad"
                onChangeText={(value) => setDurationDays(value.replace(/[^0-9]/g, ""))}
                placeholder="기간 입력"
                style={[styles.input, styles.durationInput]}
                value={durationDays}
              />
              <Text style={styles.dayText}>일</Text>
            </View>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>현재 설정 총예산</Text>
            <Text style={styles.resultValue}>{totalBudget.toLocaleString()}원</Text>
            <View style={styles.divider} />
            <Text style={styles.resultLabel}>위시를 위한 하루 예산</Text>
            <Text style={styles.dailyBudget}>{dailyBudget.toLocaleString()}원</Text>
            <Text style={styles.formula}>
              (총예산 - 위시템 가격) ÷ 모으는 기간
            </Text>
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>위시 계획 저장하기</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F7F7FB",
    flex: 1,
  },
  content: {
    padding: 22,
    paddingBottom: 50,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 14,
  },
  backButton: {
    marginLeft: -10,
    marginRight: 6,
    padding: 4,
  },
  title: {
    color: "#22222A",
    fontSize: 24,
    fontWeight: "800",
  },
  description: {
    color: "#666A7A",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },
  label: {
    color: "#333541",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5FA",
    borderRadius: 12,
    color: "#22222A",
    fontSize: 16,
    marginBottom: 18,
    padding: 15,
  },
  durationRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  durationInput: {
    flex: 1,
    marginBottom: 0,
  },
  dayText: {
    color: "#333541",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 12,
  },
  resultCard: {
    backgroundColor: "#EEF0FF",
    borderRadius: 20,
    marginTop: 18,
    padding: 20,
  },
  resultLabel: {
    color: "#656A7C",
    fontSize: 14,
    fontWeight: "700",
  },
  resultValue: {
    color: "#333541",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 5,
  },
  divider: {
    backgroundColor: "#D9DDEF",
    height: 1,
    marginVertical: 17,
  },
  dailyBudget: {
    color: "#5B21B6",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 5,
  },
  formula: {
    color: "#737687",
    fontSize: 12,
    marginTop: 7,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#5B21B6",
    borderRadius: 14,
    marginTop: 20,
    padding: 17,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
