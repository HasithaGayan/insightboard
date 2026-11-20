import { fetchUsers } from "@/legacy/services/upstreamUserService";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const users = await fetchUsers(AbortSignal.timeout(9000));
        return Response.json({ ok: true, data: users }, {
            headers: { "Cache-Control": "no-store" },
        });
    } catch {
        return Response.json({ ok: false, error: { message: "User directory is temporarily unavailable." } }, {
            status: 502,
            headers: { "Cache-Control": "no-store" },
        });
    }
}
