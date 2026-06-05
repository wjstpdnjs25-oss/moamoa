import * as SQLite from "expo-sqlite";

import { getExpenseCategoryIcon } from "@/src/constants/expense";

export type ExpenseSource = "manual" | "quick";

export type ExpenseRecord = {
  id: number;
  amount: number;
  category: string;
  label: string;
  icon: string;
  spentDate: string;
  source: ExpenseSource;
  createdAt: string;
};

export type CreateExpenseInput = {
  amount: number;
  category: string;
  label?: string;
  icon?: string;
  spentAt: Date;
  source: ExpenseSource;
};

const DATABASE_NAME = "moamoa.db";
let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;
let initializationPromise: Promise<void> | null = null;

function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

export function formatExpenseDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthRange(year: number, monthIndex: number) {
  const startDate = new Date(year, monthIndex, 1);
  const nextMonthDate = new Date(year, monthIndex + 1, 1);

  return {
    startKey: formatExpenseDateKey(startDate),
    nextMonthKey: formatExpenseDateKey(nextMonthDate),
  };
}

async function createExpenseSchema() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      category TEXT NOT NULL,
      label TEXT NOT NULL,
      icon TEXT NOT NULL,
      spent_date TEXT NOT NULL,
      source TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_expenses_spent_date
      ON expenses (spent_date);

    CREATE INDEX IF NOT EXISTS idx_expenses_category
      ON expenses (category);
  `);
}

export function initializeExpenseDatabase() {
  if (!initializationPromise) {
    initializationPromise = createExpenseSchema();
  }

  return initializationPromise;
}

function mapExpenseRow(row: {
  id: number;
  amount: number;
  category: string;
  label: string;
  icon: string;
  spent_date: string;
  source: ExpenseSource;
  created_at: string;
}): ExpenseRecord {
  return {
    id: row.id,
    amount: row.amount,
    category: row.category,
    label: row.label,
    icon: row.icon,
    spentDate: row.spent_date,
    source: row.source,
    createdAt: row.created_at,
  };
}

export async function createExpense(input: CreateExpenseInput) {
  await initializeExpenseDatabase();

  const db = await getDatabase();
  const spentDate = formatExpenseDateKey(input.spentAt);
  const label = input.label?.trim() || input.category;
  const icon = input.icon || getExpenseCategoryIcon(input.category);

  const result = await db.runAsync(
    `INSERT INTO expenses (amount, category, label, icon, spent_date, source)
     VALUES (?, ?, ?, ?, ?, ?)`,
    input.amount,
    input.category,
    label,
    icon,
    spentDate,
    input.source
  );

  const created = await db.getFirstAsync<{
    id: number;
    amount: number;
    category: string;
    label: string;
    icon: string;
    spent_date: string;
    source: ExpenseSource;
    created_at: string;
  }>("SELECT * FROM expenses WHERE id = ?", result.lastInsertRowId);

  if (!created) {
    throw new Error("Failed to load saved expense");
  }

  return mapExpenseRow(created);
}

export async function getExpensesByMonth(year: number, monthIndex: number) {
  await initializeExpenseDatabase();

  const db = await getDatabase();
  const { startKey, nextMonthKey } = getMonthRange(year, monthIndex);
  const rows = await db.getAllAsync<{
    id: number;
    amount: number;
    category: string;
    label: string;
    icon: string;
    spent_date: string;
    source: ExpenseSource;
    created_at: string;
  }>(
    `SELECT * FROM expenses
     WHERE spent_date >= ? AND spent_date < ?
     ORDER BY spent_date ASC, created_at ASC`,
    startKey,
    nextMonthKey
  );

  return rows.map(mapExpenseRow);
}

export async function getAllExpenses() {
  await initializeExpenseDatabase();

  const db = await getDatabase();
  const rows = await db.getAllAsync<{
    id: number;
    amount: number;
    category: string;
    label: string;
    icon: string;
    spent_date: string;
    source: ExpenseSource;
    created_at: string;
  }>(
    `SELECT * FROM expenses
     ORDER BY spent_date DESC, created_at DESC`
  );

  return rows.map(mapExpenseRow);
}

export async function getMonthlyExpenseTotal(year: number, monthIndex: number) {
  await initializeExpenseDatabase();

  const db = await getDatabase();
  const { startKey, nextMonthKey } = getMonthRange(year, monthIndex);
  const row = await db.getFirstAsync<{ total: number | null }>(
    `SELECT SUM(amount) AS total FROM expenses
     WHERE spent_date >= ? AND spent_date < ?`,
    startKey,
    nextMonthKey
  );

  return row?.total ?? 0;
}
