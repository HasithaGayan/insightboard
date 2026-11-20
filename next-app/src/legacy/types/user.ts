
export type UserRole =
    | "Administrator"
    | "Analyst"
    | "Viewer";

export type UserStatus =
    | "Active"
    | "Inactive";

export interface DashboardUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    joinedAt: string;
}
