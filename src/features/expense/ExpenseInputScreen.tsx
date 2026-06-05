import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PURPLE = "#7356E8";
const LIGHT_PURPLE = "#F4F1FF";
const BORDER = "#E7E7EF";
const TEXT = {
  title: "\uC9C0\uCD9C \uC785\uB825",
  subtitle: "\uC774\uBC88 \uC9C0\uCD9C\uC758 \uAE08\uC561\uACFC \uCE74\uD14C\uACE0\uB9AC\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.",
  amountTitle: "\uC9C0\uCD9C \uAE08\uC561",
  categoryTitle: "\uCE74\uD14C\uACE0\uB9AC \uC120\uD0DD",
  dateTitle: "\uC9C0\uCD9C \uB0A0\uC9DC",
  won: "\uC6D0",
  directInput: "\uC9C1\uC811\uC785\uB825",
  help: "\uD544\uC218 \uC785\uB825 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uC785\uB825\uD574\uC8FC\uC138\uC694.",
  submit: "\uC785\uB825 \uC644\uB8CC",
  customCategoryPlaceholder: "\uAE30\uD0C0 \uCE74\uD14C\uACE0\uB9AC\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694",
  customCategoryHelp: "\uAE30\uD0C0 \uC120\uD0DD \uC2DC \uC6D0\uD558\uB294 \uCE74\uD14C\uACE0\uB9AC\uBA85\uC744 \uC9C1\uC811 \uC801\uC744 \uC218 \uC788\uC5B4\uC694.",
  errorTitle: "\uC785\uB825 \uD655\uC778",
  errorMessage: "\uAE08\uC561\uACFC \uCE74\uD14C\uACE0\uB9AC, \uB0A0\uC9DC\uB97C \uBAA8\uB450 \uC120\uD0DD\uD574\uC8FC\uC138\uC694.",
  successTitle: "\uC800\uC7A5\uB418\uC5C8\uC5B4\uC694",
  successMessage: "\uC9C0\uCD9C \uC785\uB825\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
  successDetailSuffix: "\uC73C\uB85C \uC800\uC7A5\uD588\uC5B4\uC694.",
};

type Category = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

type SavedExpense = {
  amount: number;
  category: string;
  date: Date;
};

const CATEGORIES: Category[] = [
  { label: "\uC74C\uC2DD", icon: "silverware-fork-knife" },
  { label: "\uD328\uC158", icon: "tshirt-crew-outline" },
  { label: "\uC8FC\uAC70", icon: "home-outline" },
  { label: "\uAD50\uD1B5", icon: "car-outline" },
  { label: "\uCE74\uD398/\uAC04\uC2DD", icon: "coffee-outline" },
  { label: "\uC1FC\uD551", icon: "gift-outline" },
  { label: "\uBB38\uD654/\uC5EC\uAC00", icon: "ticket-percent-outline" },
  { label: "\uAD50\uC721", icon: "book-open-page-variant-outline" },
  { label: "\uC758\uB8CC/\uAC74\uAC15", icon: "medical-bag" },
  { label: "\uAE30\uD0C0", icon: "dots-horizontal-circle-outline" },
];

const CUSTOM_CATEGORY_LABEL = "\uAE30\uD0C0";

const QUICK_AMOUNTS = [
  { label: "+1\uB9CC", value: 10000 },
  { label: "+5\uB9CC", value: 50000 },
  { label: "+10\uB9CC", value: 100000 },
  { label: "+50\uB9CC", value: 500000 },
];

const WEEKDAYS = ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"];

function formatDate(date: Date) {
  const weekday = WEEKDAYS[date.getDay()];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day} (${weekday})`;
}

function toAmountText(value: number) {
  return value > 0 ? value.toLocaleString() : "0";
}

function formatSavedExpenseText(expense: SavedExpense) {
  return `${expense.amount.toLocaleString()}${TEXT.won} \uC9C0\uCD9C\uC744 ${expense.category}${TEXT.successDetailSuffix}`;
}

export default function ExpenseInputScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].label);
  const [customCategory, setCustomCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [savedExpense, setSavedExpense] = useState<SavedExpense | null>(null);

  const calendarDays = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = Array.from({ length: firstDay }, () => null);

    for (let day = 1; day <= lastDate; day += 1) {
      days.push(day);
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  }, [selectedDate]);

  const numericAmount = Number(amount.replaceAll(",", ""));
  const isCustomCategory = selectedCategory === CUSTOM_CATEGORY_LABEL;
  const submittedCategory = isCustomCategory
    ? customCategory.trim()
    : selectedCategory;
  const canSubmit = numericAmount > 0 && Boolean(submittedCategory) && Boolean(selectedDate);

  const clearSavedExpense = () => {
    setSavedExpense(null);
  };

  const handleChangeAmount = (value: string) => {
    clearSavedExpense();
    setAmount(value.replace(/[^0-9]/g, ""));
  };

  const handleAddAmount = (value: number) => {
    clearSavedExpense();
    setAmount(String(Math.max(0, numericAmount) + value));
  };

  const handleSelectDay = (day: number) => {
    clearSavedExpense();
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    );
    setCalendarOpen(false);
  };

  const handleMoveMonth = (offset: number) => {
    clearSavedExpense();
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + offset,
        Math.min(selectedDate.getDate(), 28)
      )
    );
  };

  const handleSelectCategory = (category: string) => {
    clearSavedExpense();
    setSelectedCategory(category);

    if (category !== CUSTOM_CATEGORY_LABEL) {
      setCustomCategory("");
    }
  };

  const handleChangeCustomCategory = (value: string) => {
    clearSavedExpense();
    setCustomCategory(value);
  };

  const handleSubmit = () => {
    if (!numericAmount || !submittedCategory || !selectedDate) {
      Alert.alert(TEXT.errorTitle, TEXT.errorMessage);
      return;
    }

    setSavedExpense({
      amount: numericAmount,
      category: submittedCategory,
      date: selectedDate,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            accessibilityLabel="back"
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="chevron-left" size={42} color="#111111" />
          </TouchableOpacity>

          <Text style={styles.title}>{TEXT.title}</Text>
        </View>

        <Text style={styles.subtitle}>{TEXT.subtitle}</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{TEXT.amountTitle}</Text>

          <View style={styles.amountBox}>
            <Text style={styles.currencyMark}>W</Text>
            <TextInput
              style={styles.amountInput}
              keyboardType="number-pad"
              value={toAmountText(numericAmount)}
              onChangeText={handleChangeAmount}
              textAlign="right"
            />
            <Text style={styles.wonText}>{TEXT.won}</Text>
          </View>

          <View style={styles.quickAmountRow}>
            {QUICK_AMOUNTS.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.quickAmountButton}
                onPress={() => handleAddAmount(item.value)}
              >
                <Text style={styles.quickAmountText}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.quickAmountButton}
              onPress={() => {
                clearSavedExpense();
                setAmount("");
              }}
            >
              <Text style={styles.quickAmountText}>{TEXT.directInput}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{TEXT.categoryTitle}</Text>

          <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => {
              const selected = selectedCategory === category.label;

              return (
                <TouchableOpacity
                  key={category.label}
                  style={[styles.categoryButton, selected && styles.categorySelected]}
                  onPress={() => handleSelectCategory(category.label)}
                >
                  <MaterialCommunityIcons
                    name={category.icon}
                    size={34}
                    color={selected ? "#FFFFFF" : PURPLE}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.categorySelectedText,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {isCustomCategory && (
            <View style={styles.customCategoryArea}>
              <TextInput
                style={styles.customCategoryInput}
                value={customCategory}
                onChangeText={handleChangeCustomCategory}
                placeholder={TEXT.customCategoryPlaceholder}
                placeholderTextColor="#A0A3AD"
                returnKeyType="done"
              />
              <Text style={styles.customCategoryHelp}>
                {TEXT.customCategoryHelp}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{TEXT.dateTitle}</Text>

          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setCalendarOpen((open) => !open)}
          >
            <MaterialCommunityIcons name="calendar-month-outline" size={30} color={PURPLE} />
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            <MaterialCommunityIcons
              name={calendarOpen ? "chevron-up" : "chevron-down"}
              size={28}
              color="#A0A3AD"
            />
          </TouchableOpacity>

          {calendarOpen && (
            <View style={styles.calendar}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={() => handleMoveMonth(-1)}>
                  <MaterialCommunityIcons name="chevron-left" size={30} color={PURPLE} />
                </TouchableOpacity>

                <Text style={styles.calendarMonth}>
                  {selectedDate.getFullYear()}.{String(selectedDate.getMonth() + 1).padStart(2, "0")}
                </Text>

                <TouchableOpacity onPress={() => handleMoveMonth(1)}>
                  <MaterialCommunityIcons name="chevron-right" size={30} color={PURPLE} />
                </TouchableOpacity>
              </View>

              <View style={styles.calendarGrid}>
                {WEEKDAYS.map((day) => (
                  <Text key={day} style={styles.weekdayText}>
                    {day}
                  </Text>
                ))}

                {calendarDays.map((day, index) => {
                  const selected =
                    day === selectedDate.getDate() &&
                    selectedDate.getMonth() === selectedDate.getMonth();

                  return (
                    <TouchableOpacity
                      key={`${day ?? "empty"}-${index}`}
                      style={[
                        styles.dayButton,
                        day !== null && selected && styles.dayButtonSelected,
                      ]}
                      disabled={day === null}
                      onPress={() => day !== null && handleSelectDay(day)}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          day !== null && selected && styles.dayTextSelected,
                        ]}
                      >
                        {day ?? ""}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        <View style={styles.helpRow}>
          <MaterialCommunityIcons name="information-outline" size={20} color={PURPLE} />
          <Text style={styles.helpText}>{TEXT.help}</Text>
        </View>

        {savedExpense && (
          <View style={styles.successCard}>
            <View style={styles.successIcon}>
              <MaterialCommunityIcons name="check" size={22} color="#FFFFFF" />
            </View>
            <View style={styles.successCopy}>
              <Text style={styles.successTitle}>{TEXT.successTitle}</Text>
              <Text style={styles.successMessage}>{TEXT.successMessage}</Text>
              <Text style={styles.successDetail}>
                {formatSavedExpenseText(savedExpense)}
              </Text>
              <Text style={styles.successDate}>{formatDate(savedExpense.date)}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
          accessibilityState={{ disabled: !canSubmit }}
        >
          <Text style={styles.submitText}>{TEXT.submit}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 42,
  },
  header: {
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: -10,
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#101014",
  },
  subtitle: {
    marginTop: 22,
    marginBottom: 34,
    color: "#747783",
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#111111",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 22,
  },
  amountBox: {
    height: 76,
    borderWidth: 1,
    borderColor: "#E3E3EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFDFF",
  },
  currencyMark: {
    color: "#C7C9D1",
    fontSize: 28,
    fontWeight: "800",
    textDecorationLine: "line-through",
  },
  amountInput: {
    flex: 1,
    minWidth: 0,
    color: PURPLE,
    fontSize: 36,
    fontWeight: "800",
    paddingHorizontal: 8,
  },
  wonText: {
    color: "#333333",
    fontSize: 20,
    marginBottom: 2,
  },
  quickAmountRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 22,
  },
  quickAmountButton: {
    flex: 1,
    minHeight: 46,
    borderWidth: 1.5,
    borderColor: PURPLE,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  quickAmountText: {
    color: PURPLE,
    fontSize: 15,
    fontWeight: "800",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },
  categoryButton: {
    width: "16.8%",
    minWidth: 86,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#F8F7FC",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  categorySelected: {
    backgroundColor: PURPLE,
  },
  categoryText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  categorySelectedText: {
    color: "#FFFFFF",
  },
  customCategoryArea: {
    marginTop: 18,
    gap: 8,
  },
  customCategoryInput: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#DCD8F7",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FDFDFF",
    color: "#25252A",
    fontSize: 16,
    fontWeight: "600",
  },
  customCategoryHelp: {
    color: "#747783",
    fontSize: 13,
    lineHeight: 18,
  },
  dateBox: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: "#E3E3EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FDFDFF",
  },
  dateText: {
    flex: 1,
    color: "#25252A",
    fontSize: 18,
    fontWeight: "500",
  },
  calendar: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: LIGHT_PURPLE,
    padding: 14,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  calendarMonth: {
    color: "#222222",
    fontSize: 17,
    fontWeight: "800",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  weekdayText: {
    width: `${100 / 7}%`,
    textAlign: "center",
    color: "#777985",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  dayButton: {
    width: `${100 / 7}%`,
    aspectRatio: 1.25,
    alignItems: "center",
    justifyContent: "center",
  },
  dayButtonSelected: {
    backgroundColor: PURPLE,
    borderRadius: 999,
  },
  dayText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
  },
  dayTextSelected: {
    color: "#FFFFFF",
  },
  helpRow: {
    marginTop: 24,
    marginBottom: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  helpText: {
    color: PURPLE,
    fontSize: 15,
    fontWeight: "700",
  },
  successCard: {
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#CFEAD9",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F4FFF8",
  },
  successIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#28A85A",
    alignItems: "center",
    justifyContent: "center",
  },
  successCopy: {
    flex: 1,
    minWidth: 0,
  },
  successTitle: {
    color: "#1F7A42",
    fontSize: 17,
    fontWeight: "800",
  },
  successMessage: {
    marginTop: 4,
    color: "#44514A",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  successDetail: {
    marginTop: 8,
    color: "#101014",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
  },
  successDate: {
    marginTop: 4,
    color: "#747783",
    fontSize: 13,
    fontWeight: "600",
  },
  submitButton: {
    minHeight: 72,
    borderRadius: 10,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#C9C4E8",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
});
