import { StyleSheet, Text, View } from 'react-native';

const SOFT_PURPLE = '#f5efff';
const DEEP_PURPLE = '#4f287f';

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

      
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${Math.min(Math.round(progress), 100)}%` }]} />
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
 inputCard: {
  backgroundColor: SOFT_PURPLE, 
  borderRadius: 12,
  padding: 16,
  marginTop: 10,
},

cardTitle: {
  fontSize: 28,
  fontWeight: '800',
  color: DEEP_PURPLE,
  marginBottom: 12,
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

progressBarBackground: {
  height: 12,
  backgroundColor: '#EFEFEF',
  borderRadius: 6,
  overflow: 'hidden',
  marginTop: 10,
  marginBottom: 4,
},
progressBarFill: {
  height: '100%',
  backgroundColor: DEEP_PURPLE,
  borderRadius: 6,
},
});