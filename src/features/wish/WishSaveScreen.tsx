import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function WishSaveScreen({ navigation }: { navigation: any }) {
  const [itemName, setItemName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleRegister = () => {
    if (!itemName.trim() || !targetAmount.trim()) {
      Alert.alert('알림', '사고 싶은 것과 목표 금액을 모두 입력해주세요!');
      return;
    }
    
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.wishBox}>
        <Text style={styles.purpleTitle}>위시템 등록하기</Text>
        
        {/* 사고 싶은 것 입력창 */}
        <TextInput 
          style={styles.input} 
          placeholder="사고 싶은 것 (예: 에어팟)" 
          placeholderTextColor="#aaa"
          value={itemName}
          onChangeText={setItemName} // 글자가 바뀔 때마다 itemName에 저장
        />
        
        {/* 목표 금액 입력창 */}
        <TextInput 
          style={styles.input} 
          placeholder="목표 금액" 
          placeholderTextColor="#aaa"
          keyboardType="numeric" // 숫자 키패드가 뜨도록 설정
          value={targetAmount}
          onChangeText={setTargetAmount} // 글자가 바뀔 때마다 targetAmount에 저장
        />
        
        {/* 등록 완료 버튼 */}
        <TouchableOpacity style={styles.purpleButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>등록 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎨 화면에 딱 맞는 깔끔한 스타일시트
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fc', // 앱 전체 배경색과 통일
    justifyContent: 'center',  // 화면 정중앙에 배치
    padding: 16,
  },
  wishBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    // 은은한 그림자 효과
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  purpleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5b21b6', // 메인 보라색 톤
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
    color: '#333',
  },
  purpleButton: {
    backgroundColor: '#5b21b6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
