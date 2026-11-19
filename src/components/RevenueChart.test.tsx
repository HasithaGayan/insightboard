
import {
    describe,
    it,
    expect,
} from "vitest";

import {
    render,
    screen,
    within,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import RevenueChart from "./RevenueChart";

describe("RevenueChart", () => {
    it("displays six months of revenue by default", () => {
        render(<RevenueChart />);

        const chart = screen.getByRole("list", {
            name: "Monthly revenue values",
        });

        expect(
            within(chart).getAllByRole("listitem")
        ).toHaveLength(6);

        expect(
            within(chart).getByText("$48,250")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("status")
        ).toHaveTextContent("Showing 6 months");
    });

    it("displays only the latest three months", async () => {
        const user = userEvent.setup();

        render(<RevenueChart />);

        await user.selectOptions(
            screen.getByLabelText("Time period"),
            "3"
        );

        const chart = screen.getByRole("list", {
            name: "Monthly revenue values",
        });

        expect(
            within(chart).getAllByRole("listitem")
        ).toHaveLength(3);

        expect(
            within(chart).getByText("Sep 2026")
        ).toBeInTheDocument();

        expect(
            within(chart).getByText("Nov 2026")
        ).toBeInTheDocument();

        expect(
            within(chart).queryByText("Jun 2026")
        ).not.toBeInTheDocument();

        expect(
            screen.getByRole("status")
        ).toHaveTextContent("Showing 3 months");
    });

    it("restores all records when six months is selected", async () => {
        const user = userEvent.setup();

        render(<RevenueChart />);

        const period = screen.getByLabelText(
            "Time period"
        );

        await user.selectOptions(period, "3");
        await user.selectOptions(period, "6");

        const chart = screen.getByRole("list", {
            name: "Monthly revenue values",
        });

        expect(
            within(chart).getAllByRole("listitem")
        ).toHaveLength(6);

        expect(
            within(chart).getByText("Jun 2026")
        ).toBeInTheDocument();
    });
});
