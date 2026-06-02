import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const mySpending = 320000;

const AVERAGE_SPENDING: Record<string, Record<string, number>> = {
  '20대': {
    대학생: 550000,
    자취생: 1450000,
    회사원: 1650000,
  },

  '30대': {
    자취생: 1800000,
    회사원: 2200000,
  },
};

type FilterButtonProps = {
  text: string;
  selected: boolean;
  onPress: () => void;
};

function FilterButton({
  text,
  selected,
  onPress,
}: FilterButtonProps) {
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

export default function UsageCompareCard() {
  const [ageGroup, setAgeGroup] = useState('20대');
  const [jobType, setJobType] = useState('자취생');

  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [isLifestyleOpen, setIsLifestyleOpen] =
    useState(false);

  const averageSpending =
    AVERAGE_SPENDING[ageGroup]?.[jobType] ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>소비 비교</Text>

        <View style={styles.rowBetween}>
          <Text>나의 소비</Text>
          <Text>{mySpending.toLocaleString()}원</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>평균 소비</Text>
          <Text>
            {averageSpending.toLocaleString()}원
          </Text>
        </View>

        {/* 연령 */}
        <Text style={styles.label}>연령</Text>

        <Pressable
          style={styles.dropdownHeader}
          onPress={() => setIsAgeOpen(!isAgeOpen)}
        >
          <Text>{ageGroup}</Text>
          <Text>{isAgeOpen ? '▲' : '▼'}</Text>
        </Pressable>

        {isAgeOpen && (
          <View style={styles.dropdownContent}>
            <FilterButton
              text="20대"
              selected={ageGroup === '20대'}
              onPress={() => {
                setAgeGroup('20대');
                setIsAgeOpen(false);
              }}
            />

            <FilterButton
              text="30대"
              selected={ageGroup === '30대'}
              onPress={() => {
                setAgeGroup('30대');
                setIsAgeOpen(false);
              }}
            />
          </View>
        )}

        {/* 사용자 유형 */}
        <Text style={styles.label}>사용자 유형</Text>

        <Pressable
          style={styles.dropdownHeader}
          onPress={() =>
            setIsLifestyleOpen(!isLifestyleOpen)
          }
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
    backgroundColor: '#F8F9FA',
    flex: 1,
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

  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: 'bold',
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

  resultBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
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
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
});