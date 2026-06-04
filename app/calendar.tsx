import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 5, 15));

  const selectedMonthStart = useMemo(() => {
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  }, [selectedDate]);

  const handleMoveMonth = (offset: number) => {
    setSelectedDate(new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth() + offset, 15));
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
});
