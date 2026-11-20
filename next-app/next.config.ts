import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Explicit Next.js project root; parent repository also has a lockfile.
    turbopack: { root: process.cwd() },
    // Keep request/cache semantics simple during the Vite -> Next.js migration.
    // Introduce Cache Components in a later, separately tested refinement.
    cacheComponents: false,
};

export default nextConfig;
