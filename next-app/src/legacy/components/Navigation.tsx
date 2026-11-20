"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
    { label: "Dashboard", path: "/" },
    { label: "Users", path: "/users" },
    { label: "Settings", path: "/settings" },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="dashboard-navigation" aria-label="Main navigation">
            {navigationItems.map(item => {
                const active = item.path === "/"
                    ? pathname === "/" || pathname === "/dashboard"
                    : pathname === item.path || pathname.startsWith(`${item.path}/`);

                return (
                    <Link
                        key={item.path}
                        href={item.path}
                        aria-current={active ? "page" : undefined}
                        className={active
                            ? "navigation-link navigation-link--active"
                            : "navigation-link"}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
