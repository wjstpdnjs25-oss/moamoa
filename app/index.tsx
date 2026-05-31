/*import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function Home() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Welcome — new project initialized</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
import { ThemedView } from '@/components/themed-view';
import UsageCompareCard from '@/components/UsageCompareCard';

export default function Home() {
  return (
    <ThemedView>
      <UsageCompareCard />
    </ThemedView>
  );
}