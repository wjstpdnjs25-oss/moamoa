import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SOFT_PURPLE = '#f5efff';
const DEEP_PURPLE = '#4f287f';

export default function WishSaveCard({
  title,
  targetAmount = 0,
  savedAmount = 0,
  onDelete,
  onSave,
  isEditing,
  onEdit,
  onTitleChange, 
  onPriceChange, 
  onEditDone
}) {
  const safeTarget = Number(targetAmount) || 0;
  const safeSaved = Number(savedAmount) || 0;
  const [inputAmount, setInputAmount] = useState('');

  const progress =
    safeTarget > 0 ? (safeSaved / safeTarget) * 100 : 0;

  const remaining = safeTarget - safeSaved;
  

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
      <Text style={styles.title}>{title || "위시 아이템"}</Text>
     <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>삭제</Text>
    </TouchableOpacity>
  </View>

{!isEditing && (
  <>
    <Text style={styles.targetText}>{targetAmount.toLocaleString()}원 목표</Text>
    <TouchableOpacity style={styles.editButton} onPress={onEdit}>
      <Text style={styles.editButtonText}>수정하기</Text>
    </TouchableOpacity>
  </>
)}
{isEditing && (
    <View style={styles.editContainer}>
    <Text style={{fontWeight: '700', marginBottom: 8}}>정보 수정하기</Text>

    <TextInput
      style={styles.amountInput}
      placeholder="사고 싶은 물건"
      value={title} 
      onChangeText={onTitleChange} 
      />

    <TextInput
      style={styles.amountInput}
      placeholder="목표 금액"
      keyboardType="numeric"
      value={String(targetAmount)} 
      onChangeText={onPriceChange} 
    />
    <TouchableOpacity 
      style={[styles.saveSubmitButton, {backgroundColor: '#3D5AFE', marginTop: 15}]} 
      onPress={onEditDone} // 수정 완료 버튼 
    >
      <Text style={styles.saveSubmitButtonText}>수정 완료</Text>
          </TouchableOpacity>
        </View>
      )}

      
     {remaining <= 0 ? (
        <Text style={styles.achievedText}>
        🎉 축하합니다! 목표 금액을 전액 모았습니다!</Text>
        ) : (
        <Text style={styles.remaining}>{remaining.toLocaleString()}원 남았어요</Text>
      )}

      <TextInput
      style={styles.amountInput}
      placeholder="오늘 저축할 금액 입력"
      keyboardType="numeric"
      value={inputAmount}
      onChangeText={setInputAmount}
      />
      <TouchableOpacity 
      style={styles.saveSubmitButton} 
      activeOpacity={0.8}
       onPress={() => {
        if (inputAmount) {
          onSave(Number(inputAmount));
          setInputAmount(''); 
          }
        }}
      > 
        <Text style={styles.saveSubmitButtonText}>저축하기</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '800',
    color: DEEP_PURPLE,
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
deleteButton: {
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: '#FF3B30', 
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 6,
},
deleteButtonText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '600',
},
amountInput: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E5E5EA',
  borderRadius: 10,
  padding: 12,
  marginTop: 12,
  fontSize: 14,
  color: '#000000',
},
saveSubmitButton: {
  backgroundColor: DEEP_PURPLE,
  padding: 12,
  borderRadius: 10,
  marginTop: 8,
  alignItems: 'center',
  justifyContent: 'center',
},
saveSubmitButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '700',
},
});