
import type {
    ApiUser,
    ApiUserRole,
} from "../types/apiUser";

export type RoleFilter =
    | "all"
    | ApiUserRole;

export type UserSortOrder =
    | "name-asc"
    | "name-desc"
    | "id-asc"
    | "id-desc";

export interface UserFilters {
    search: string;
    role: RoleFilter;
    sort: UserSortOrder;
}

export function filterUsers(
    users: readonly ApiUser[],
    filters: UserFilters
): ApiUser[] {
    const searchTerm =
        filters.search.trim().toLowerCase();

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm);

        const matchesRole =
            filters.role === "all" ||
            user.role === filters.role;

        return matchesSearch && matchesRole;
    });

    return filteredUsers.sort((first, second) => {
        switch (filters.sort) {
            case "name-asc":
                return (
                    first.name.localeCompare(second.name) ||
                    first.id - second.id
                );

            case "name-desc":
                return (
                    second.name.localeCompare(first.name) ||
                    first.id - second.id
                );

            case "id-asc":
                return first.id - second.id;

            case "id-desc":
                return second.id - first.id;
        }
    });
}
