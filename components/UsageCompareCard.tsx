import { StyleSheet, Text, View } from 'react-native';
export default function UsageCompareCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>소비 비교</Text>

      <View style={styles.row}>
        <Text>나의 소비</Text>
        <Text>320,000원</Text>
      </View>

      <View style={styles.row}>
        <Text>평균 소비</Text>
        <Text>410,000원</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});