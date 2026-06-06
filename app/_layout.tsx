import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

import { BudgetAlertWatcher } from "../contexts/BudgetAlertWatcher";
import { BudgetProvider } from "../contexts/BudgetContext";
import { ExpenseProvider } from "../contexts/ExpenseContext";
import { WishProvider } from "../contexts/WishContext";

export default function RootLayout() {
  return (
    <BudgetProvider>
      <ExpenseProvider>
        <WishProvider>
          <BudgetAlertWatcher />
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </WishProvider>
      </ExpenseProvider>
    </BudgetProvider>
  );
}
