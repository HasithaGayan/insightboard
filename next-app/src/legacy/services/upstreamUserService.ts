
import type {
    ApiUser,
    ApiUserRole,
} from "../types/apiUser";

const BASE_URL = "https://dummyjson.com/users";

function normalizeUser(value: unknown): ApiUser {
    if (
        typeof value !== "object" ||
        value === null ||
        !("id" in value) ||
        typeof value.id !== "number" ||
        !Number.isSafeInteger(value.id) ||
        value.id <= 0 ||
        !("firstName" in value) ||
        typeof value.firstName !== "string" ||
        !value.firstName.trim() ||
        !("lastName" in value) ||
        typeof value.lastName !== "string" ||
        !value.lastName.trim() ||
        !("email" in value) ||
        typeof value.email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) ||
        !("role" in value)
    ) {
        throw new Error(
            "The API returned an invalid user record."
        );
    }

    let role: ApiUserRole;

    switch (value.role) {
        case "admin":
            role = "Administrator";
            break;

        case "moderator":
            role = "Moderator";
            break;

        case "user":
            role = "User";
            break;

        default:
            throw new Error(
                "The API returned an unsupported user role."
            );
    }

    return {
        id: value.id,
        name: `${value.firstName.trim()} ${value.lastName.trim()}`,
        email: value.email,
        role,
    };
}

export async function fetchUsers(
    signal: AbortSignal
): Promise<ApiUser[]> {
    const response = await fetch(
        `${BASE_URL}?limit=20&select=id,firstName,lastName,email,role`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(
            `Could not load users. HTTP ${response.status}.`
        );
    }

    const data: unknown = await response.json();

    if (
        typeof data !== "object" ||
        data === null ||
        !("users" in data) ||
        !Array.isArray(data.users)
    ) {
        throw new Error(
            "The API returned an invalid users response."
        );
    }

    const users = data.users.map(normalizeUser);

    const ids = new Set(users.map(user => user.id));

    if (ids.size !== users.length) {
        throw new Error(
            "The API returned duplicate user identifiers."
        );
    }

    return users;
}

export async function fetchUserById(
    id: string,
    signal: AbortSignal
): Promise<ApiUser | null> {
    if (
        !/^[1-9]\d*$/.test(id) ||
        !Number.isSafeInteger(Number(id))
    ) {
        return null;
    }

    const response = await fetch(
        `${BASE_URL}/${id}`,
        { signal }
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            `Could not load user. HTTP ${response.status}.`
        );
    }

    const data: unknown = await response.json();
    const user = normalizeUser(data);

    if (String(user.id) !== id) {
        throw new Error(
            "The API returned an unexpected user identifier."
        );
    }

    return user;
}
