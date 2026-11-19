
import {
    describe,
    it,
    expect,
} from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
    MemoryRouter,
    Routes,
    Route,
    Link,
} from "react-router";

import RouteContent from "./RouteContent";

function renderTestApplication() {
    return render(
        <MemoryRouter initialEntries={["/"]}>
            <nav aria-label="Test navigation">
                <Link to="/">Home</Link>

                <Link to="/users">Users</Link>
            </nav>

            <Routes>
                <Route element={<RouteContent />}>
                    <Route
                        index
                        element={<h2>Dashboard</h2>}
                    />

                    <Route
                        path="users"
                        element={<h2>User Directory</h2>}
                    />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

describe("RouteContent", () => {
    it("does not steal focus on initial rendering", () => {
        renderTestApplication();

        const content = screen.getByRole(
            "region",
            {
                name: "Page content",
            }
        );

        expect(content).not.toHaveFocus();

        expect(
            screen.getByRole("heading", {
                name: "Dashboard",
            })
        ).toBeInTheDocument();
    });

    it("moves focus to the content after navigation", async () => {
        const user = userEvent.setup();

        renderTestApplication();

        await user.click(
            screen.getByRole("link", {
                name: "Users",
            })
        );

        expect(
            screen.getByRole("heading", {
                name: "User Directory",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("region", {
                name: "Page content",
            })
        ).toHaveFocus();
    });
});
