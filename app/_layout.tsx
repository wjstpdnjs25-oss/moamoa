import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React from 'react';

import { BudgetProvider } from '@/contexts/BudgetContext';

export default function RootLayout() {
  return (
    <BudgetProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </BudgetProvider>
  );
}
