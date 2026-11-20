import type { ApiUser } from "../types/apiUser";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isApiUser(value: unknown): value is ApiUser {
    return isRecord(value) &&
        typeof value.id === "number" && Number.isSafeInteger(value.id) && value.id > 0 &&
        typeof value.name === "string" && value.name.trim().length > 0 &&
        typeof value.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) &&
        (value.role === "Administrator" || value.role === "Moderator" || value.role === "User");
}

async function readApi(response: Response): Promise<unknown> {
    let data: unknown;
    try { data = await response.json(); }
    catch { throw new Error("The server returned invalid JSON."); }
    if (!response.ok || !isRecord(data) || data.ok !== true) {
        throw new Error(
            isRecord(data) && isRecord(data.error) && typeof data.error.message === "string"
                ? data.error.message
                : `Could not load users. HTTP ${response.status}.`
        );
    }
    return data.data;
}

// Browser requests use our own Next.js API; the server contacts DummyJSON.
export async function fetchUsers(signal: AbortSignal): Promise<ApiUser[]> {
    const response = await fetch("/api/users", { signal, cache: "no-store" });
    const users = await readApi(response);
    if (!Array.isArray(users) || !users.every(isApiUser)) {
        throw new Error("The API returned an invalid users response.");
    }
    const ids = new Set(users.map(user => user.id));
    if (ids.size !== users.length) throw new Error("Duplicate user identifiers.");
    return users;
}

export async function fetchUserById(
    id: string, signal: AbortSignal
): Promise<ApiUser | null> {
    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) return null;
    const response = await fetch(`/api/users/${encodeURIComponent(id)}`, {
        signal,
        cache: "no-store",
    });
    if (response.status === 404) return null;
    const user = await readApi(response);
    if (!isApiUser(user) || String(user.id) !== id) {
        throw new Error("The API returned an invalid user record.");
    }
    return user;
}
