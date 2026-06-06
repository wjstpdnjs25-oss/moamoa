import { MaterialCommunityIcons } from "@expo/vector-icons";

export type ExpenseCategory = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  backgroundColor: string;
};

export type ExpenseCategoryStyle = Pick<ExpenseCategory, "color" | "backgroundColor">;

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { label: "음식", icon: "silverware-fork-knife", color: "#E35D5B", backgroundColor: "#FFF0EF" },
  { label: "패션", icon: "tshirt-crew-outline", color: "#8A55D7", backgroundColor: "#F4EDFF" },
  { label: "주거", icon: "home-outline", color: "#2E7D64", backgroundColor: "#EBF7F3" },
  { label: "교통", icon: "car-outline", color: "#2F73D9", backgroundColor: "#EDF4FF" },
  { label: "카페/간식", icon: "coffee-outline", color: "#B9791E", backgroundColor: "#FFF6E7" },
  { label: "쇼핑", icon: "gift-outline", color: "#D45E9B", backgroundColor: "#FFF0F7" },
  { label: "문화/여가", icon: "ticket-percent-outline", color: "#287D8E", backgroundColor: "#EAF8FA" },
  { label: "교육", icon: "book-open-page-variant-outline", color: "#7B6A20", backgroundColor: "#FBF7DF" },
  { label: "의료/건강", icon: "medical-bag", color: "#22966E", backgroundColor: "#E9F8F1" },
  { label: "기타", icon: "dots-horizontal-circle-outline", color: "#6B6B7E", backgroundColor: "#F1F1F5" },
];

export const DEFAULT_EXPENSE_CATEGORY = EXPENSE_CATEGORIES[0];
export const CUSTOM_EXPENSE_CATEGORY_LABEL = "기타";
export const QUICK_EXPENSE_CATEGORIES = ["음식", "교통", "카페/간식", "쇼핑"];
export const CATEGORY_LEGEND = ["음식", "카페/간식", "교통", "패션", "쇼핑", "기타"];

export function getExpenseCategory(label: string) {
  return EXPENSE_CATEGORIES.find((category) => category.label === label);
}

export function getExpenseCategoryIcon(label: string) {
  return getExpenseCategory(label)?.icon ?? "dots-horizontal-circle-outline";
}

export function getExpenseCategoryStyle(label: string): ExpenseCategoryStyle {
  const category = getExpenseCategory(label);

  return {
    color: category?.color ?? "#6B6B7E",
    backgroundColor: category?.backgroundColor ?? "#F1F1F5",
  };
}
