
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach,
} from "vitest";

import {
    fetchUsers,
    fetchUserById,
} from "./userService";

const mockFetch = vi.fn<typeof fetch>();

const rawUser = {
    id: 1,
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex@example.com",
    role: "admin",
};

const normalizedUser = {
    id: 1,
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "Administrator",
};

function jsonResponse(
    data: unknown,
    status = 200
): Response {
    return new Response(
        JSON.stringify(data),
        {
            status,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

describe("userService", () => {
    beforeEach(() => {
        mockFetch.mockReset();

        vi.stubGlobal("fetch", mockFetch);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("fetches and normalizes user records", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse({
                users: [rawUser],
            })
        );

        const controller = new AbortController();

        const users = await fetchUsers(
            controller.signal
        );

        expect(users).toEqual([
            normalizedUser,
        ]);

        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining("/users?limit=20"),
            {
                signal: controller.signal,
            }
        );
    });

    it("accepts an empty users array", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse({
                users: [],
            })
        );

        const controller = new AbortController();

        await expect(
            fetchUsers(controller.signal)
        ).resolves.toEqual([]);
    });

    it("rejects an invalid response structure", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse({
                accounts: [],
            })
        );

        const controller = new AbortController();

        await expect(
            fetchUsers(controller.signal)
        ).rejects.toThrow(
            "The API returned an invalid users response."
        );
    });

    it("rejects an invalid user record", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse({
                users: [
                    {
                        ...rawUser,
                        id: "invalid",
                    },
                ],
            })
        );

        const controller = new AbortController();

        await expect(
            fetchUsers(controller.signal)
        ).rejects.toThrow(
            "The API returned an invalid user record."
        );
    });

    it("rejects duplicate user identifiers", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse({
                users: [
                    rawUser,
                    rawUser,
                ],
            })
        );

        const controller = new AbortController();

        await expect(
            fetchUsers(controller.signal)
        ).rejects.toThrow(
            "The API returned duplicate user identifiers."
        );
    });

    it("handles unsuccessful HTTP responses", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse(
                { message: "Server failure" },
                500
            )
        );

        const controller = new AbortController();

        await expect(
            fetchUsers(controller.signal)
        ).rejects.toThrow(
            "Could not load users. HTTP 500."
        );
    });

    it("fetches an individual user by ID", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse(rawUser)
        );

        const controller = new AbortController();

        await expect(
            fetchUserById(
                "1",
                controller.signal
            )
        ).resolves.toEqual(normalizedUser);

        expect(mockFetch).toHaveBeenCalledWith(
            "https://dummyjson.com/users/1",
            {
                signal: controller.signal,
            }
        );
    });

    it("returns null when a user does not exist", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse(
                { message: "User not found" },
                404
            )
        );

        const controller = new AbortController();

        await expect(
            fetchUserById(
                "999999",
                controller.signal
            )
        ).resolves.toBeNull();
    });

    it("rejects invalid identifiers without fetching", async () => {
        const controller = new AbortController();

        await expect(
            fetchUserById(
                "abc",
                controller.signal
            )
        ).resolves.toBeNull();

        expect(mockFetch).not.toHaveBeenCalled();
    });

    it("rejects an unexpected returned user ID", async () => {
        mockFetch.mockResolvedValue(
            jsonResponse({
                ...rawUser,
                id: 2,
            })
        );

        const controller = new AbortController();

        await expect(
            fetchUserById(
                "1",
                controller.signal
            )
        ).rejects.toThrow(
            "The API returned an unexpected user identifier."
        );
    });
});
