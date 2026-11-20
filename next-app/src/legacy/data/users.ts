
import type { DashboardUser } from "../types/user";

export const users: DashboardUser[] = [
    {
        id: 1,
        name: "Alex Morgan",
        email: "alex@example.com",
        role: "Administrator",
        status: "Active",
        joinedAt: "2026-08-12",
    },
    {
        id: 2,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "Analyst",
        status: "Active",
        joinedAt: "2026-09-04",
    },
    {
        id: 3,
        name: "Daniel Lee",
        email: "daniel@example.com",
        role: "Viewer",
        status: "Inactive",
        joinedAt: "2026-09-18",
    },
    {
        id: 4,
        name: "Emily Carter",
        email: "emily@example.com",
        role: "Analyst",
        status: "Active",
        joinedAt: "2026-10-02",
    },
    {
        id: 5,
        name: "James Miller",
        email: "james@example.com",
        role: "Viewer",
        status: "Active",
        joinedAt: "2026-10-15",
    },
];
