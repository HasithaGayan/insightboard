
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import UsersPage from "./UsersPage";

import { fetchUsers } from "../services/userService";
import type { ApiUser } from "../types/apiUser";

vi.mock("../services/userService", () => ({
    fetchUsers: vi.fn(),
}));

const mockFetchUsers = vi.mocked(fetchUsers);

const testUsers: ApiUser[] = [
    {
        id: 1,
        name: "Alex Morgan",
        email: "alex@example.com",
        role: "Administrator",
    },
    {
        id: 2,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "User",
    },
    {
        id: 3,
        name: "Daniel Lee",
        email: "daniel@example.com",
        role: "Moderator",
    },
];

function renderUsersPage() {
    return render(
        <MemoryRouter initialEntries={["/users"]}>
            <UsersPage />
        </MemoryRouter>
    );
}

describe("UsersPage", () => {
    beforeEach(() => {
        mockFetchUsers.mockReset();
    });

    it("displays loading while the request is pending", () => {
        mockFetchUsers.mockImplementation(
            () => new Promise<ApiUser[]>(() => {})
        );

        renderUsersPage();

        expect(
            screen.getByText("Loading users...")
        ).toBeInTheDocument();
    });

    it("renders successfully loaded users", async () => {
        mockFetchUsers.mockResolvedValue(testUsers);

        renderUsersPage();

        expect(
            await screen.findByText("Alex Morgan")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Sarah Wilson")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Daniel Lee")
        ).toBeInTheDocument();
    });

    it("displays an empty API response", async () => {
        mockFetchUsers.mockResolvedValue([]);

        renderUsersPage();

        expect(
            await screen.findByText("No users available")
        ).toBeInTheDocument();
    });

    it("displays an API error", async () => {
        mockFetchUsers.mockRejectedValue(
            new Error("API unavailable")
        );

        renderUsersPage();

        expect(
            await screen.findByRole("alert")
        ).toHaveTextContent("API unavailable");

        expect(
            screen.getByRole("button", {
                name: "Retry",
            })
        ).toBeInTheDocument();
    });

    it("recovers successfully after retrying", async () => {
        const user = userEvent.setup();

        mockFetchUsers
            .mockRejectedValueOnce(
                new Error("Network failure")
            )
            .mockResolvedValueOnce(testUsers);

        renderUsersPage();

        const retryButton =
            await screen.findByRole("button", {
                name: "Retry",
            });

        await user.click(retryButton);

        expect(
            await screen.findByText("Alex Morgan")
        ).toBeInTheDocument();

        expect(
            screen.queryByRole("alert")
        ).not.toBeInTheDocument();
    });

    it("filters users by their names", async () => {
        const user = userEvent.setup();

        mockFetchUsers.mockResolvedValue(testUsers);

        renderUsersPage();

        await screen.findByText("Alex Morgan");

        await user.type(
            screen.getByRole("searchbox", {
                name: /search users/i,
            }),
            "SARAH"
        );

        expect(
            screen.getByText("Sarah Wilson")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Alex Morgan")
        ).not.toBeInTheDocument();

        expect(
            screen.getByText("Showing 1 of 3 users")
        ).toBeInTheDocument();
    });

    it("filters users by their account role", async () => {
        const user = userEvent.setup();

        mockFetchUsers.mockResolvedValue(testUsers);

        renderUsersPage();

        await screen.findByText("Alex Morgan");

        await user.selectOptions(
            screen.getByLabelText("Account role"),
            "Moderator"
        );

        expect(
            screen.getByText("Daniel Lee")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Sarah Wilson")
        ).not.toBeInTheDocument();
    });

    it("distinguishes no search matches from an empty API", async () => {
        const user = userEvent.setup();

        mockFetchUsers.mockResolvedValue(testUsers);

        renderUsersPage();

        await screen.findByText("Alex Morgan");

        await user.type(
            screen.getByRole("searchbox"),
            "zzzzz"
        );

        expect(
            screen.getByText("No matching users")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("No users available")
        ).not.toBeInTheDocument();

        const [clearFiltersButton] =
            screen.getAllByRole("button", {
                name: "Clear Filters",
            });

        await user.click(clearFiltersButton);

        expect(
            screen.getByText("Alex Morgan")
        ).toBeInTheDocument();
    });
});
