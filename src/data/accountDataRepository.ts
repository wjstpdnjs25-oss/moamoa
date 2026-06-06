import * as SQLite from "expo-sqlite";

import type { WishPlan } from "@/contexts/WishContext";

export type BudgetItem = {
  category: string;
  amount: number;
};

const DATABASE_NAME = "moamoa.db";
const BUDGET_CATEGORIES = [
  "음식",
  "패션",
  "주거",
  "교통",
  "카페/간식",
  "쇼핑",
  "문화/여가",
  "교육",
  "의료/건강",
  "기타",
];
let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;
let initializationPromise: Promise<void> | null = null;

function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

async function createAccountDataSchema() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS account_budgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      category TEXT NOT NULL,
      amount INTEGER NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_account_budgets_user_category
      ON account_budgets (user_id, category);

    CREATE TABLE IF NOT EXISTS account_wish_plans (
      user_id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      target_amount INTEGER NOT NULL,
      duration_days INTEGER NOT NULL,
      started_at TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function initializeAccountDataDatabase() {
  if (!initializationPromise) {
    initializationPromise = createAccountDataSchema();
  }

  return initializationPromise;
}

export async function getBudgetsForUser(userId: string): Promise<BudgetItem[]> {
  await initializeAccountDataDatabase();

  const db = await getDatabase();
  const rows = await db.getAllAsync<BudgetItem>(
    `SELECT category, amount
     FROM account_budgets
     WHERE user_id = ?`,
    userId
  );
  const savedByCategory = new Map(
    rows.map((row) => [row.category, row.amount])
  );

  return BUDGET_CATEGORIES.map((category) => ({
    category,
    amount: savedByCategory.get(category) ?? 0,
  }));
}

export async function saveBudgetForUser(
  userId: string,
  category: string,
  amount: number
) {
  await initializeAccountDataDatabase();

  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO account_budgets (user_id, category, amount, updated_at)
     VALUES (?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(user_id, category)
     DO UPDATE SET amount = excluded.amount, updated_at = CURRENT_TIMESTAMP`,
    userId,
    category,
    amount
  );
}

export async function getWishPlanForUser(
  userId: string
): Promise<WishPlan | null> {
  await initializeAccountDataDatabase();

  const db = await getDatabase();
  const row = await db.getFirstAsync<{
    title: string;
    target_amount: number;
    duration_days: number;
    started_at: string;
  }>(
    `SELECT title, target_amount, duration_days, started_at
     FROM account_wish_plans
     WHERE user_id = ?`,
    userId
  );

  if (!row) {
    return null;
  }

  return {
    title: row.title,
    targetAmount: row.target_amount,
    durationDays: row.duration_days,
    startedAt: row.started_at,
  };
}

export async function saveWishPlanForUser(
  userId: string,
  plan: WishPlan
) {
  await initializeAccountDataDatabase();

  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO account_wish_plans (
       user_id,
       title,
       target_amount,
       duration_days,
       started_at,
       updated_at
     )
     VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(user_id)
     DO UPDATE SET
       title = excluded.title,
       target_amount = excluded.target_amount,
       duration_days = excluded.duration_days,
       started_at = excluded.started_at,
       updated_at = CURRENT_TIMESTAMP`,
    userId,
    plan.title,
    plan.targetAmount,
    plan.durationDays,
    plan.startedAt
  );
}
