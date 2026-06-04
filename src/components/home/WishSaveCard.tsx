import { StyleSheet, Text, View } from 'react-native';

export default function WishSaveCard({
  title,
  targetAmount,
  savedAmount,
}) {

  const progress = 
  targetAmount > 0 ? (savedAmount / targetAmount) * 100 : 0;

  const remaining = targetAmount - savedAmount;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.amount}>
        {savedAmount.toLocaleString()}원 / {targetAmount.toLocaleString()}원
      </Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%` },
          ]}
        />
      </View>

      <Text style={styles.percent}>
      {Math.round(progress)}%
      </Text>

      <Text style={styles.remaining}>
        {remaining.toLocaleString()}원 남았어요
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  amount: {
    fontSize: 16,
    color: '#555',
    marginBottom: 14,
  },
  progressBackground: {
    width: '100%',
    height: 14,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 20,
  },
  remaining: {
    fontSize: 15,
    color: '#666',
  },
  percent: {
  marginTop: 8,
  fontSize: 14,
  fontWeight: '600',
  color: '#4A90E2',
},
});
