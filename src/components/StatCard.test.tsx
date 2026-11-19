
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import StatCard from "./StatCard";

describe("StatCard", () => {
    it("displays the statistic title and value", () => {
        render(
            <StatCard
                title="Total Revenue"
                value="$48,250"
            />
        );

        expect(
            screen.getByText("Total Revenue")
        ).toBeInTheDocument();

        expect(
            screen.getByText("$48,250")
        ).toBeInTheDocument();
    });

    it("displays the percentage change when provided", () => {
        render(
            <StatCard
                title="Total Revenue"
                value="$48,250"
                change="+12.5%"
            />
        );

        expect(
            screen.getByText("+12.5%")
        ).toBeInTheDocument();
    });

    it("does not display a missing percentage change", () => {
        render(
            <StatCard
                title="Total Revenue"
                value="$48,250"
            />
        );

        expect(
            screen.queryByText(/\d+(\.\d+)?%/)
        ).not.toBeInTheDocument();
    });
});
