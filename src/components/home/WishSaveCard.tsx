import { StyleSheet, Text, View } from 'react-native';

export default function WishSaveCard({
  title,
  targetAmount = 0,
  savedAmount = 0,
}) {
  const safeTarget = Number(targetAmount) || 0;
  const safeSaved = Number(savedAmount) || 0;

  const progress =
    safeTarget > 0 ? (safeSaved / safeTarget) * 100 : 0;

  const remaining = safeTarget - safeSaved;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.amount}>
        {safeSaved.toLocaleString()}원 / {safeTarget.toLocaleString()}원
      </Text>

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
 inputCard: {
  backgroundColor: 'red', 
  borderRadius: 12,
  padding: 16,
  marginTop: 10,
},

input: {
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 10,
  marginTop: 10,
},

addButton: {
  backgroundColor: '#3D5AFE',
  padding: 12,
  borderRadius: 10,
  marginTop: 10,
  alignItems: 'center',
},

addButtonText: {
  color: '#fff',
  fontWeight: '700',
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
percent: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  remaining: {
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
  },
});