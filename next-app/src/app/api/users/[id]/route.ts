import { fetchUserById } from "@/legacy/services/upstreamUserService";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return Response.json({ ok: false, error: { message: "Invalid user ID." } }, {
            status: 400,
            headers: { "Cache-Control": "no-store" },
        });
    }

    try {
        const user = await fetchUserById(id, AbortSignal.timeout(9000));
        if (user === null) {
            return Response.json({ ok: false, error: { message: "User not found." } }, {
                status: 404,
                headers: { "Cache-Control": "no-store" },
            });
        }
        return Response.json({ ok: true, data: user }, {
            headers: { "Cache-Control": "no-store" },
        });
    } catch {
        return Response.json({ ok: false, error: { message: "User details are temporarily unavailable." } }, {
            status: 502,
            headers: { "Cache-Control": "no-store" },
        });
    }
}
