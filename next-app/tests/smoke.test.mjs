
import test from "node:test";
import assert from "node:assert/strict";

const origin =
    process.env.INSIGHTBOARD_BASE_URL ??
    "http://127.0.0.1:3000";

async function request(path) {
    return fetch(new URL(path, origin), {
        redirect: "manual",
        signal: AbortSignal.timeout(10000),
    });
}

test("dashboard loads with InsightBoard branding", async () => {
    const response = await request("/");
    assert.equal(response.status, 200);

    const html = await response.text();
    assert.match(html, /InsightBoard/);
    assert.match(html, /Dashboard Overview/);
});

test("Users page loads", async () => {
    const response = await request("/users");
    assert.equal(response.status, 200);

    const html = await response.text();
    assert.match(html, /Users/);
});

test("Settings page loads", async () => {
    const response = await request("/settings");
    assert.equal(response.status, 200);

    const html = await response.text();
    assert.match(html, /Settings/);
});

test("old dashboard URL redirects to home", async () => {
    const response = await request("/dashboard");

    assert.ok([307, 308].includes(response.status));

    const location = response.headers.get("location");
    assert.ok(location);
    assert.equal(new URL(location, origin).pathname, "/");
});

for (const invalidId of [
    "abc",
    "0",
    "1.5",
    "999999999999999999999",
]) {
    test(`API rejects invalid ID: ${invalidId}`, async () => {
        const response = await request(
            `/api/users/${invalidId}`
        );

        assert.equal(response.status, 400);

        const body = await response.json();
        assert.equal(body.ok, false);
    });
}
