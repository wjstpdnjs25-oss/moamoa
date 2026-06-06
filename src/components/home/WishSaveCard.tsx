import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WishSaveCard({ navigation }: { navigation: any }) {
  const wishItem = "에어팟 프로";
  const targetAmount = 300000; // 목표 금액 (30만 원)
  const currentSaved = 120000;  // 현재 모은 금액 (12만 원)

  // 달성률 계산 (현재 금액 / 목표 금액 * 100)
  const percentage = Math.min(Math.round((currentSaved / targetAmount) * 100), 100);
  // 남은 금액 계산
  const remainingAmount = targetAmount - currentSaved;
  
  
 return (
    <View style={styles.container}>
    

      <TouchableOpacity 
        style={styles.wishProgressBox}
        onPress={() => navigation.navigate('WishSave')} // 누르면 등록/수정 화면으로 이동
        activeOpacity={0.9}
      >
        <View style={styles.wishHeader}>
          <Text style={styles.wishTitle}>🎁 나의 위시템: <Text style={styles.purpleText}>{wishItem}</Text></Text>
          <Text style={styles.percentText}>{percentage}% 달성</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
        </View>

        <View style={styles.wishFooter}>
          <Text style={styles.amountText}>
            {currentSaved.toLocaleString()}원 / {targetAmount.toLocaleString()}원
          </Text>
          <Text style={styles.remainingText}>
            앞으로 <Text style={styles.boldText}>{remainingAmount.toLocaleString()}원</Text> 남았어요!
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    width: '100%' 
  },
  wishProgressBox: { 
    backgroundColor: '#EEF0FF', 
    padding: 16, 
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  wishHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  wishTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  purpleText: { 
    color: '#5b21b6' 
  },
  percentText: { 
    fontWeight: 'bold', 
    color: '#5b21b6', 
    fontSize: 16 
  },
  progressBarBackground: { 
    height: 12, 
    backgroundColor: '#e2e8f0', 
    borderRadius: 6, 
    marginVertical: 12,
    overflow: 'hidden'
  },
  progressBarFill: { 
    height: '100%', 
    backgroundColor: '#5b21b6', 
    borderRadius: 6 
  },
  wishFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  amountText: { 
    color: '#64748b', 
    fontSize: 13 
  },
  remainingText: { 
    fontSize: 13, 
    color: '#334155' 
  },
  boldText: { 
    fontWeight: 'bold', 
    color: '#e11d48' 
  }
});
