import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const SAMPLE_EXPENSES: Record<string, { id: string; label: string; icon: string; amount: number }[]> = {
  "2024-06-02": [{ id: "lunch", label: "점심 식사", icon: "food", amount: 15000 }],
  "2024-06-04": [{ id: "coffee", label: "카페", icon: "coffee", amount: 12000 }],
  "2024-06-05": [{ id: "dinner", label: "저녁 식사", icon: "food-variant", amount: 8000 }],
  "2024-06-07": [{ id: "transport", label: "교통", icon: "bus", amount: 23000 }],
  "2024-06-08": [{ id: "shopping", label: "의류 쇼핑", icon: "tshirt-crew-outline", amount: 10000 }],
  "2024-06-10": [{ id: "lunch2", label: "점심 식사", icon: "food", amount: 18000 }],
  "2024-06-12": [{ id: "market", label: "마트", icon: "cart", amount: 31500 }],
  "2024-06-13": [{ id: "delivery", label: "배달 음식", icon: "food-variant", amount: 7000 }],
  "2024-06-14": [{ id: "dessert", label: "디저트", icon: "cupcake", amount: 12000 }],
  "2024-06-15": [
    { id: "lunch3", label: "점심 식사", icon: "food", amount: 18000 },
    { id: "coffee2", label: "카페", icon: "coffee", amount: 6000 },
    { id: "shopping2", label: "의류 쇼핑", icon: "tshirt-crew-outline", amount: 54000 },
  ],
};

function formatDayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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

  const handleMoveMonth = (offset: number) => {
    setSelectedDate(new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth() + offset, 15));
  };

  const handleSelectDay = (day: number) => {
    setSelectedDate(new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth(), day));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>소비 달력</Text>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialCommunityIcons name="calendar-month-outline" size={26} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={() => handleMoveMonth(-1)} style={styles.monthArrow}>
              <MaterialCommunityIcons name="chevron-left" size={24} color="#7356E8" />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{`${selectedMonthStart.getFullYear()}년 ${String(selectedMonthStart.getMonth() + 1).padStart(2, "0")}월`}</Text>
            <TouchableOpacity onPress={() => handleMoveMonth(1)} style={styles.monthArrow}>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#7356E8" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekdayRow}>
            {WEEKDAYS.map((day) => (
              <Text key={day} style={styles.weekdayText}>{day}</Text>
            ))}
          </View>

          <View style={styles.grid}>
            {monthDays.map((day, index) => {
              const hasExpense = typeof day === "number" && monthTotals[day] > 0;
              const isSelected = day === selectedDate.getDate();

              return (
                <TouchableOpacity
                  key={`${day ?? "empty"}-${index}`}
                  style={[styles.dayCell, day === null && styles.emptyCell, isSelected && styles.dayCellSelected]}
                  disabled={day === null}
                  onPress={() => typeof day === "number" && handleSelectDay(day)}
                >
                  <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}>{day ?? ""}</Text>
                  <Text style={[styles.dayAmount, hasExpense && styles.dayAmountActive]}>
                    {day !== null ? `${monthTotals[day].toLocaleString()}원` : ""}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7FB' },
  container: { flex: 1, paddingHorizontal: 22 },
  content: { paddingBottom: 40 },
  header: { marginTop: 12, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerButton: { width: 44, height: 44, borderRadius: 16, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: '#111111' },
  calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 20, marginBottom: 16 },
  monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  monthLabel: { fontSize: 18, fontWeight: '700', color: '#111111' },
  monthArrow: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#EEF0FF', justifyContent: 'center', alignItems: 'center' },
  weekdayRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  weekdayText: { width: '14.28%', textAlign: 'center', color: '#777777', fontSize: 12, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  dayCell: { width: '14.28%', minHeight: 84, borderRadius: 18, paddingVertical: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  emptyCell: { backgroundColor: 'transparent' },
  dayCellSelected: { backgroundColor: '#EEE7FF', borderWidth: 1, borderColor: '#7356E8' },
  dayNumber: { fontSize: 14, fontWeight: '700', color: '#111111' },
  dayNumberSelected: { color: '#7356E8' },
  dayAmount: { fontSize: 9, color: '#A0A3AD', marginTop: 4, textAlign: 'center' },
  dayAmountActive: { color: '#111111', fontWeight: '700' },
});
