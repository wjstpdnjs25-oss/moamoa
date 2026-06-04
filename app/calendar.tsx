import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CalendarScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'} 뒤로</Text>
          </TouchableOpacity>
          <Text style={styles.title}>소비 달력</Text>
          <View style={styles.headerPlaceholder} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7FB' },
  container: { flex: 1, paddingHorizontal: 22 },
  content: { paddingBottom: 40 },
  header: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { padding: 10 },
  backText: { fontSize: 16, color: '#111111' },
  title: { fontSize: 20, fontWeight: '700', color: '#111111' },
  headerPlaceholder: { width: 56 },
});
