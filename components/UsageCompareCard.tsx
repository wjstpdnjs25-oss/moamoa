import { StyleSheet, Text, View } from 'react-native';
export default function UsageCompareCard() {
  const [ageGroup, setAgeGroup] = useState('20대');
  

  return (
    <ThemedText style={styles.label}>연령</ThemedText>

  <View style={styles.row}>
    <FilterButton
      text="20대"
      selected={ageGroup === '20대'}
      onPress={() => setAgeGroup('20대')}
    />
    <FilterButton
      text="30대"
      selected={ageGroup === '30대'}
      onPress={() => setAgeGroup('30대')}
    />
  </View>
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