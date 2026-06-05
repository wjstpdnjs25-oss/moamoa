import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

type ExpenseItem = {
  id: string;
  label: string;
  category: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  amount: number;
};

type CategoryStyle = {
  color: string;
  backgroundColor: string;
};

type CategorySummary = {
  category: string;
  amount: number;
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  음식: { color: "#E35D5B", backgroundColor: "#FFF0EF" },
  패션: { color: "#8A55D7", backgroundColor: "#F4EDFF" },
  주거: { color: "#2E7D64", backgroundColor: "#EBF7F3" },
  교통: { color: "#2F73D9", backgroundColor: "#EDF4FF" },
  "카페/간식": { color: "#B9791E", backgroundColor: "#FFF6E7" },
  쇼핑: { color: "#D45E9B", backgroundColor: "#FFF0F7" },
  "문화/여가": { color: "#287D8E", backgroundColor: "#EAF8FA" },
  교육: { color: "#7B6A20", backgroundColor: "#FBF7DF" },
  "의료/건강": { color: "#22966E", backgroundColor: "#E9F8F1" },
  기타: { color: "#6B6B7E", backgroundColor: "#F1F1F5" },
};

const DEFAULT_CATEGORY_STYLE = CATEGORY_STYLES.기타;
const CATEGORY_LEGEND = ["음식", "카페/간식", "교통", "패션", "쇼핑", "기타"];

const SAMPLE_EXPENSES: Record<string, ExpenseItem[]> = {
  "2024-06-02": [{ id: "lunch", label: "점심 식사", category: "음식", icon: "food", amount: 15000 }],
  "2024-06-04": [{ id: "coffee", label: "카페", category: "카페/간식", icon: "coffee", amount: 12000 }],
  "2024-06-05": [{ id: "dinner", label: "저녁 식사", category: "음식", icon: "food-variant", amount: 8000 }],
  "2024-06-07": [{ id: "transport", label: "교통", category: "교통", icon: "bus", amount: 23000 }],
  "2024-06-08": [{ id: "shopping", label: "의류 쇼핑", category: "패션", icon: "tshirt-crew-outline", amount: 10000 }],
  "2024-06-10": [{ id: "lunch2", label: "점심 식사", category: "음식", icon: "food", amount: 18000 }],
  "2024-06-12": [{ id: "market", label: "마트", category: "쇼핑", icon: "cart", amount: 31500 }],
  "2024-06-13": [{ id: "delivery", label: "배달 음식", category: "음식", icon: "food-variant", amount: 7000 }],
  "2024-06-14": [{ id: "dessert", label: "디저트", category: "카페/간식", icon: "cupcake", amount: 12000 }],
  "2024-06-15": [
    { id: "lunch3", label: "점심 식사", category: "음식", icon: "food", amount: 18000 },
    { id: "coffee2", label: "카페", category: "카페/간식", icon: "coffee", amount: 6000 },
    { id: "shopping2", label: "의류 쇼핑", category: "패션", icon: "tshirt-crew-outline", amount: 54000 },
  ],
};

function formatMonthLabel(date: Date) {
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월`;
}

function formatDayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatCurrency(amount: number) {
  return `${amount.toLocaleString()}원`;
}

function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
}

function summarizeByCategory(expenses: ExpenseItem[]) {
  const totals = expenses.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + item.amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 5, 15));

  const selectedMonthStart = useMemo(() => {
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  }, [selectedDate]);

  const monthDays = useMemo(() => {
    const year = selectedMonthStart.getFullYear();
    const month = selectedMonthStart.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array.from({ length: firstDay }, () => null);

    for (let day = 1; day <= lastDate; day += 1) {
      cells.push(day);
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [selectedMonthStart]);

  const monthTotals = useMemo(() => {
    return monthDays.reduce<Record<number, number>>((acc, day) => {
      if (!day) return acc;

      const key = formatDayKey(new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth(), day));
      acc[day] = (SAMPLE_EXPENSES[key] || []).reduce((sum, item) => sum + item.amount, 0);

      return acc;
    }, {});
  }, [monthDays, selectedMonthStart]);

  const monthCategorySummaries = useMemo(() => {
    return monthDays.reduce<Record<number, CategorySummary[]>>((acc, day) => {
      if (!day) return acc;

      const key = formatDayKey(new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth(), day));
      acc[day] = summarizeByCategory(SAMPLE_EXPENSES[key] || []);

      return acc;
    }, {});
  }, [monthDays, selectedMonthStart]);

  const selectedDayKey = formatDayKey(selectedDate);
  const selectedExpenses = SAMPLE_EXPENSES[selectedDayKey] || [];
  const selectedTotal = selectedExpenses.reduce((sum, item) => sum + item.amount, 0);
  const selectedCategorySummary = summarizeByCategory(selectedExpenses);

  const handleMoveMonth = (offset: number) => {
    setSelectedDate(new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth() + offset, 15));
  };

  const handleSelectDay = (day: number) => {
    setSelectedDate(new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth(), day));
  };

  const handleGoToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>소비 달력</Text>
          <TouchableOpacity style={styles.headerButton} onPress={handleGoToday}>
            <MaterialCommunityIcons name="calendar-month-outline" size={26} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={() => handleMoveMonth(-1)} style={styles.monthArrow}>
              <MaterialCommunityIcons name="chevron-left" size={24} color="#7356E8" />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{formatMonthLabel(selectedMonthStart)}</Text>
            <TouchableOpacity onPress={() => handleMoveMonth(1)} style={styles.monthArrow}>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#7356E8" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekdayRow}>
            {WEEKDAYS.map((day) => (
              <Text key={day} style={styles.weekdayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {monthDays.map((day, index) => {
              const hasExpense = typeof day === "number" && monthTotals[day] > 0;
              const isSelected = day === selectedDate.getDate();
              const categorySummary = typeof day === "number" ? monthCategorySummaries[day] || [] : [];
              const primaryCategoryStyle = categorySummary[0]
                ? getCategoryStyle(categorySummary[0].category)
                : DEFAULT_CATEGORY_STYLE;

              return (
                <TouchableOpacity
                  key={`${day ?? "empty"}-${index}`}
                  style={[
                    styles.dayCell,
                    hasExpense && { backgroundColor: primaryCategoryStyle.backgroundColor },
                    day === null && styles.emptyCell,
                    isSelected && { ...styles.dayCellSelected, borderColor: primaryCategoryStyle.color },
                  ]}
                  disabled={day === null}
                  onPress={() => typeof day === "number" && handleSelectDay(day)}
                >
                  <Text style={[styles.dayNumber, isSelected && { color: primaryCategoryStyle.color }]}>{day ?? ""}</Text>
                  <Text style={[styles.dayAmount, hasExpense && styles.dayAmountActive]}>
                    {day !== null ? formatCurrency(monthTotals[day]) : ""}
                  </Text>
                  {day !== null && (
                    <View style={styles.categoryDotRow}>
                      {hasExpense ? (
                        categorySummary.slice(0, 3).map((summary) => (
                          <View
                            key={summary.category}
                            style={[styles.dot, { backgroundColor: getCategoryStyle(summary.category).color }]}
                          />
                        ))
                      ) : (
                        <View style={[styles.dot, styles.dotInactive]} />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.legendRow}>
          {CATEGORY_LEGEND.map((category) => {
            const categoryStyle = getCategoryStyle(category);

            return (
              <View key={category} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: categoryStyle.color }]} />
                <Text style={styles.legendText}>{category}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>{`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 지출 내역`}</Text>
            <Text style={styles.summaryTotal}>{formatCurrency(selectedTotal)}</Text>
          </View>
          {selectedCategorySummary.length > 0 && (
            <View style={styles.categorySummaryRow}>
              {selectedCategorySummary.map((summary) => {
                const categoryStyle = getCategoryStyle(summary.category);

                return (
                  <View
                    key={summary.category}
                    style={[styles.categorySummaryChip, { backgroundColor: categoryStyle.backgroundColor }]}
                  >
                    <Text style={[styles.categorySummaryText, { color: categoryStyle.color }]}>
                      {summary.category} {formatCurrency(summary.amount)}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
          {selectedExpenses.length === 0 ? (
            <Text style={styles.emptyText}>선택한 날짜에 지출 내역이 없습니다.</Text>
          ) : (
            selectedExpenses.map((item) => {
              const categoryStyle = getCategoryStyle(item.category);

              return (
                <View key={item.id} style={styles.transactionRow}>
                  <View style={[styles.iconCircle, { backgroundColor: categoryStyle.backgroundColor }]}>
                    <MaterialCommunityIcons name={item.icon} size={20} color={categoryStyle.color} />
                  </View>
                  <View style={styles.transactionCopy}>
                    <Text style={styles.transactionLabel}>{item.label}</Text>
                    <Text style={[styles.transactionCategory, { color: categoryStyle.color }]}>{item.category}</Text>
                  </View>
                  <Text style={styles.transactionAmount}>{formatCurrency(item.amount)}</Text>
                </View>
              );
            })
          )}
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7FB" },
  container: { flex: 1, paddingHorizontal: 22 },
  content: { paddingBottom: 40 },
  header: { marginTop: 12, marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerButton: { width: 44, height: 44, borderRadius: 16, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700", color: "#111111" },
  calendarCard: { backgroundColor: "#FFFFFF", borderRadius: 28, padding: 20, marginBottom: 16 },
  monthHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  monthLabel: { fontSize: 18, fontWeight: "700", color: "#111111" },
  monthArrow: { width: 40, height: 40, borderRadius: 14, backgroundColor: "#EEF0FF", justifyContent: "center", alignItems: "center" },
  weekdayRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  weekdayText: { width: "14.28%", textAlign: "center", color: "#777777", fontSize: 12, fontWeight: "700" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  dayCell: { width: "14.28%", minHeight: 84, borderRadius: 18, paddingVertical: 10, marginBottom: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  emptyCell: { backgroundColor: "transparent" },
  dayCellSelected: { borderWidth: 1 },
  dayNumber: { fontSize: 14, fontWeight: "700", color: "#111111" },
  dayAmount: { fontSize: 9, color: "#A0A3AD", marginTop: 4, textAlign: "center" },
  dayAmountActive: { color: "#111111", fontWeight: "700" },
  categoryDotRow: { minHeight: 8, flexDirection: "row", justifyContent: "center", gap: 3, marginTop: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  dotActive: { backgroundColor: "#7356E8" },
  dotInactive: { backgroundColor: "#D9D9E3" },
  legendRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  legendItem: { minHeight: 28, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, borderRadius: 14, backgroundColor: "#FFFFFF" },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  legendText: { color: "#6B6B7E", fontSize: 12 },
  summaryCard: { backgroundColor: "#FFFFFF", borderRadius: 28, padding: 20, marginBottom: 18 },
  summaryHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  summaryTitle: { fontSize: 16, fontWeight: "700", color: "#111111" },
  summaryTotal: { fontSize: 16, fontWeight: "700", color: "#7356E8" },
  categorySummaryRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  categorySummaryChip: { minHeight: 30, borderRadius: 15, justifyContent: "center", paddingHorizontal: 12 },
  categorySummaryText: { fontSize: 12, fontWeight: "800" },
  emptyText: { color: "#777777", fontSize: 14, textAlign: "center", paddingVertical: 20 },
  transactionRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F0F0F5" },
  iconCircle: { width: 42, height: 42, borderRadius: 16, backgroundColor: "#EEF0FF", justifyContent: "center", alignItems: "center", marginRight: 12 },
  transactionCopy: { flex: 1, minWidth: 0 },
  transactionLabel: { fontSize: 15, color: "#111111" },
  transactionCategory: { marginTop: 3, fontSize: 12, fontWeight: "800" },
  transactionAmount: { fontSize: 15, fontWeight: "700", color: "#111111" },
  closeButton: { height: 58, borderRadius: 18, backgroundColor: "#7356E8", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  closeButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
