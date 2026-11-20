
export type ApiUserRole =
    | "Administrator"
    | "Moderator"
    | "User";

export interface ApiUser {
    id: number;
    name: string;
    email: string;
    role: ApiUserRole;
}
