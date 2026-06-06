import { render } from "@testing-library/react-native";

import WishSaveCard from "@/src/components/home/WishSaveCard";

describe("WishSaveCard", () => {
  it("renders wish details with normalized numeric values", async () => {
    const { getByText } = await render(
      <WishSaveCard
        achievementRate="75"
        compliantDays="3"
        dailyBudget="12000"
        evaluatedDays="4"
        title="새 노트북"
      />
    );

    expect(getByText("새 노트북")).toBeTruthy();
    expect(getByText(/75%/)).toBeTruthy();
    expect(getByText(/12,000/)).toBeTruthy();
    expect(getByText(/3/)).toBeTruthy();
    expect(getByText(/4/)).toBeTruthy();
  });
});
