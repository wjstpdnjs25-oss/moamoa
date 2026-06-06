import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface WishItem {
  id: string;
  name: string;
  amount: number;
}
export default function WishSaveScreen({ navigation }: { navigation: any }) {
  const [itemName, setItemName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [wishList, setWishList] = useState<WishItem[]>([]);


  const handleRegister = () => {
    if (!itemName.trim() || !targetAmount.trim()) {
      Alert.alert('알림', '사고 싶은 것과 목표 금액을 모두 입력해주세요!');
      return;
    }
    const newItem: WishItem = {
    id: Date.now().toString(),
    name: itemName,
    amount: Number(targetAmount),
  };

  setWishList([newItem, ...wishList]);
  setItemName('');
  setTargetAmount('');
  
  Alert.alert('성공', '위시템이 리스트에 추가되었습니다!');
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
          onChangeText={setTargetAmount}
        />
        
        {/* 등록 완료 버튼 */}
        <TouchableOpacity style={styles.purpleButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>등록 완료</Text>
        </TouchableOpacity>
      </View>
        <View style={{ flex: 1, marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>📜 나의 위시리스트</Text>
  <     FlatList
            data={wishList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ padding: 16, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16 }}>🎁 {item.name}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#5b21b6' }}>{item.amount.toLocaleString()}원</Text>
                </View>
    )}
  />
</View>

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fc', 
    justifyContent: 'center',  
    padding: 16,
  },
  wishBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  purpleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5b21b6', 
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
