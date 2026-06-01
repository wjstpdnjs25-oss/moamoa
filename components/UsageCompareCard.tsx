import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

function FilterButton({ text, selected, onPress }) {
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

  return (
    <View style={styles.container}>

      {/* 연령 필터 */}
      <ThemedText style={styles.label}>연령</ThemedText>

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
      </View>

      {/* 소비 비교 카드 */}
      <View style={styles.card}>
        <Text style={styles.title}>소비 비교</Text>

        <View style={styles.row}>
          <Text>나의 소비</Text>
          <Text>320,000원</Text>
        </View>

        <View style={styles.row}>
          <Text>평균 소비</Text>
          <Text>410,000원</Text>
        </View>
      </View>

      {/* 라이프스타일 */}
      <ThemedText style={styles.label}>라이프스타일</ThemedText>

      <View style={styles.row}>
        <FilterButton
          text="자취생"
          selected={jobType === '자취생'}
          onPress={() => setJobType('자취생')}
        />

        <FilterButton
          text="대학생"
          selected={jobType === '대학생'}
          onPress={() => setJobType('대학생')}
        />

        <FilterButton
          text="회사원"
          selected={jobType === '회사원'}
          onPress={() => setJobType('회사원')}
        />
      </View>

      {/* 선택 결과 */}
      <View style={styles.resultBox}>
        <Text>
          선택: {ageGroup} / {jobType}
        </Text>
      </View>

    </View>
  );
}