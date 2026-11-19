
import {
    describe,
    it,
    expect,
    beforeEach,
} from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import App from "./App";

describe("InsightBoard integration", () => {
    beforeEach(() => {
        localStorage.removeItem(
            "insightboard-preferences"
        );

        localStorage.removeItem(
            "insightboard-watchlist"
        );

        window.history.replaceState(
            null,
            "",
            "/"
        );
    });

    it("shares statistics preferences between Settings and Dashboard", async () => {
        const user = userEvent.setup();

        render(<App />);

        expect(
            screen.getByRole("heading", {
                name: "Revenue Trend",
            })
        ).toBeInTheDocument();

        await user.click(
            screen.getByRole("link", {
                name: "Settings",
            })
        );

        const statisticsCheckbox =
            screen.getByRole("checkbox", {
                name: "Show statistics",
            });

        expect(statisticsCheckbox).toBeChecked();

        await user.click(statisticsCheckbox);

        expect(statisticsCheckbox).not.toBeChecked();

        await user.click(
            screen.getByRole("link", {
                name: "Dashboard",
            })
        );

        expect(
            screen.queryByRole("heading", {
                name: "Revenue Trend",
            })
        ).not.toBeInTheDocument();

        expect(
            screen.getByText(
                "Statistics hidden by your display preferences."
            )
        ).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", {
                name: "Show Statistics",
            })
        );

        expect(
            screen.getByRole("heading", {
                name: "Revenue Trend",
            })
        ).toBeInTheDocument();
    });

    it("resets shared display preferences to their defaults", async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(
            screen.getByRole("link", {
                name: "Settings",
            })
        );

        const statisticsCheckbox =
            screen.getByRole("checkbox", {
                name: "Show statistics",
            });

        const changesCheckbox =
            screen.getByRole("checkbox", {
                name: "Show percentage changes",
            });

        await user.click(statisticsCheckbox);
        await user.click(changesCheckbox);

        expect(statisticsCheckbox).not.toBeChecked();
        expect(changesCheckbox).not.toBeChecked();

        await user.click(
            screen.getByRole("button", {
                name: "Reset to Defaults",
            })
        );

        expect(statisticsCheckbox).toBeChecked();
        expect(changesCheckbox).toBeChecked();

        await user.click(
            screen.getByRole("link", {
                name: "Dashboard",
            })
        );

        expect(
            screen.getByRole("heading", {
                name: "Revenue Trend",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText("+12.5%")
        ).toBeInTheDocument();
    });

    it("restores saved preferences when the application remounts", async () => {
        const user = userEvent.setup();

        const { unmount } = render(<App />);

        await user.click(
            screen.getByRole("button", {
                name: "Hide Statistics",
            })
        );

        expect(
            screen.queryByRole("heading", {
                name: "Revenue Trend",
            })
        ).not.toBeInTheDocument();

        unmount();

        window.history.replaceState(
            null,
            "",
            "/settings"
        );

        render(<App />);

        expect(
            screen.getByRole("checkbox", {
                name: "Show statistics",
            })
        ).not.toBeChecked();

        await user.click(
            screen.getByRole("link", {
                name: "Dashboard",
            })
        );

        expect(
            screen.queryByRole("heading", {
                name: "Revenue Trend",
            })
        ).not.toBeInTheDocument();
    });
});
