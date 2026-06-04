import { useState } from 'react';
import {
  Pressable,
  StyleSheet, Text, View
} from 'react-native';
const mySpending = 320000;

function FilterButton({
  text,
  selected,
  onPress,
}: {
  text: string;
  selected: boolean;
  onPress: () => void;
}) {
   return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        selected && styles.buttonSelected,
      ]}
    >
      <Text style={{ color: selected ? '#fff' : '#333' }}>
        {text}
      </Text>
    </Pressable>
  );
}
const AVERAGE_SPENDING = {
  '20대': {
    대학생: 550000,
    자취생: 1450000,
    회사원: 165000,
  },

  '30대': {
    자취생: 1800000,
    회사원: 2200000,
  },
};

  

export default function UsageCompareCard() {
  const [ageGroup, setAgeGroup] = useState('20대');
  const [jobType, setJobType] = useState('자취생');

  const [isLifestyleOpen, setIsLifestyleOpen] = useState(false);

  const averageSpending =
    AVERAGE_SPENDING[ageGroup]?.[jobType] ?? 0;

  const diff = mySpending - averageSpending;

  return (
    <View style={styles.container}>

      {/* 연령 필터 */}
      <Text style={styles.label}>연령</Text>
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
        <View style={styles.filterRow}>
          <FilterButton
          text="대학생"
          selected={jobType === '대학생'}
          onPress={() => setJobType('대학생')}
        />
          
        <FilterButton
          text="자취생"
          selected={jobType === '자취생'}
          onPress={() => setJobType('자취생')}
        />

        <FilterButton
          text="회사원"
          selected={jobType === '회사원'}
          onPress={() => setJobType('회사원')}
        />
      </View>
      </View>

  
      {/* 소비 비교 카드 */}
      <View style={styles.card}>
        <Text style={styles.title}>소비 비교</Text>

        <View style={styles.rowBetween}>
          <Text>나의 소비</Text>
          <Text>{mySpending.toLocaleString()}원</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>평균 소비</Text>
          <Text>{averageSpending.toLocaleString()}원</Text>
        </View>

      {/* 라이프스타일 */}
<Text style={styles.label}>
  라이프스타일
</Text>

<Pressable
  style={styles.dropdownHeader}
  onPress={() => setIsLifestyleOpen(!isLifestyleOpen)}
>
  <Text>{jobType}</Text>
  <Text>{isLifestyleOpen ? '▲' : '▼'}</Text>
</Pressable>

{isLifestyleOpen && (
  <View style={styles.dropdownContent}>
    <FilterButton
      text="자취생"
      selected={jobType === '자취생'}
      onPress={() => {
        setJobType('자취생');
        setIsLifestyleOpen(false);
      }}
    />

    <FilterButton
      text="대학생"
      selected={jobType === '대학생'}
      onPress={() => {
        setJobType('대학생');
        setIsLifestyleOpen(false);
      }}
    />

    <FilterButton
      text="회사원"
      selected={jobType === '회사원'}
      onPress={() => {
        setJobType('회사원');
        setIsLifestyleOpen(false);
      }}
    />
  </View>
)}
      {/* 선택 결과 */}
      <View style={styles.resultBox}>
        <Text>
          선택: {ageGroup} / {jobType}
        </Text>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
  },

  buttonSelected: {
    backgroundColor: '#4A90E2',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  resultBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },

  button: {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 10,
  backgroundColor: '#F2F2F2',
},

  buttonSelected: {
  backgroundColor: '#6C5CE7',
},
dropdownHeader: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 14,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
},

dropdownContent: {
  marginTop: 10,
  gap: 8,
},
});

