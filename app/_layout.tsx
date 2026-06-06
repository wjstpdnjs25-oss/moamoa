import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

import { BudgetAlertWatcher } from "../contexts/BudgetAlertWatcher";
import { BudgetProvider } from "../contexts/BudgetContext";
import { ExpenseProvider } from "../contexts/ExpenseContext";

export default function RootLayout() {
  return (
    <BudgetProvider>
      <ExpenseProvider>
        <BudgetAlertWatcher />
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ExpenseProvider>
    </BudgetProvider>
  );
}
