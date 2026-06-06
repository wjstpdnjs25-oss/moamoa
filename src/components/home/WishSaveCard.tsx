import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SOFT_PURPLE = '#f5efff';
const DEEP_PURPLE = '#4f287f';

export default function WishSaveCard({
  title,
  targetAmount = 0,
  savedAmount = 0,
  isInput = false, 
  onDelete,
  onSave,
  onEdit,
  onTitleChange,
  onPriceChange,
  onEditDone,


}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputAmount, setInputAmount] = useState('');
  
 const [localTitle, setLocalTitle] = useState('');
  const [localTarget, setLocalTarget] = useState('');
  
  const safeTarget = Number(targetAmount) || 0;
  const safeSaved = Number(savedAmount) || 0;

  const remaining = safeTarget - safeSaved;

  if (isInput) {
 return (
  <View style={styles.card}>
<Text style={{ fontWeight: '700', marginBottom: 8, color: DEEP_PURPLE }}>
          위시템 등록하기
        </Text>

    <TextInput
          style={styles.amountInput}
          placeholder="사고 싶은 것(예:에어팟)"
          value={localTitle}
          onChangeText={setLocalTitle} // 내부 local 상태에 저장
        />

        <TextInput
          style={styles.amountInput}
          placeholder="목표 금액"
          keyboardType="numeric"
          value={localTarget}
          onChangeText={setLocalTarget} 
        />

        <TouchableOpacity
          style={styles.saveSubmitButton}
          onPress={() => {
            if (localTitle && localTarget) {
              // 홈 화면(부모)의 handleAddWish로 데이터 전송 (저축액은 처음엔 0원)
              onSave(0, localTitle, Number(localTarget));
              setLocalTitle('');
              setLocalTarget('');
            }
          }}
        >
          <Text style={styles.saveSubmitButtonText}>등록 완료</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.card}>
      {/* 헤더 */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title || "위시 아이템"}</Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>삭제</Text>
        </TouchableOpacity>
      </View>

      {/* 보기 / 수정 모드 */}
      {!isEditing ? (
        <View>
          <Text style={styles.targetText}>
            {safeTarget.toLocaleString()}원 목표 (현재 {safeSaved.toLocaleString()}원 저축)
          </Text>

          {safeTarget > 0 && remaining <= 0 ? (
            <Text style={styles.achievedText}>🎉 목표 금액 달성!</Text>
          ) : (
            <Text style={styles.remaining}>
              {remaining.toLocaleString()}원 남았어요
            </Text>
          )}

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>수정하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.editContainer}>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>정보 수정하기</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="사고 싶은 것"
            value={title}
            onChangeText={onTitleChange}
          />
          <TextInput
            style={styles.amountInput}
            placeholder="목표 금액"
            keyboardType="numeric"
            value={targetAmount ? String(targetAmount) : ''}
            onChangeText={onPriceChange}
          />
          <TouchableOpacity
            style={styles.saveSubmitButton}
            onPress={() => {
              if (onEditDone) onEditDone();
              setIsEditing(false);
            }}
          >
            <Text style={styles.saveSubmitButtonText}>수정 완료</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 저축 입력 */}
      {!isEditing && (
        <View style={{ marginTop: 12, borderTopWidth: 1, borderColor: '#eee', paddingTop: 12 }}>
          <TextInput
            style={styles.amountInput}
            placeholder="오늘 저축할 금액"
            keyboardType="numeric"
            value={inputAmount}
            onChangeText={setInputAmount}
          />
          <TouchableOpacity
            style={styles.saveSubmitButton}
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
      )}
    </View>
  );
} 


const styles =  StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  deleteButton: {
    padding: 6,
  },

  deleteButtonText: {
    color: 'red',
  },

  targetText: {
    fontSize: 14,
    marginTop: 8,
  },

  remaining: {
    color: '#666',
    marginTop: 4,
  },

  achievedText: {
    color: '#3D5AFE',
    fontWeight: '700',
    marginTop: 4,
  },

  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },

  editButtonText: {
    textAlign: 'center',
  },

  editContainer: {
    marginTop: 10,
  },

  amountInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  saveSubmitButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#4f287f',
    marginTop: 10,
  },

  saveSubmitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});