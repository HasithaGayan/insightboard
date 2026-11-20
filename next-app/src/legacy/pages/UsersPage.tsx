"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";

import Link from "next/link";

import Card from "../components/Card";
import Button from "../components/Button";

import { fetchUsers } from "../services/userService";
import { useAsyncData } from "../hooks/useAsyncData";

import { filterUsers } from "../utils/filterUsers";

import type {
    UserFilters,
} from "../utils/filterUsers";



const defaultFilters: UserFilters = {
    search: "",
    role: "all",
    sort: "name-asc",
};

function UsersPage() {
    const { state, retry } =
        useAsyncData(fetchUsers);

    const [filters, setFilters] =
        useState<UserFilters>(defaultFilters);

    function handleSearch(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const search = event.target.value;

        setFilters(previous => ({
            ...previous,
            search,
        }));
    }

    function handleRoleChange(
        event: ChangeEvent<HTMLSelectElement>
    ) {
        const role = event.target.value;

        if (
            role === "all" ||
            role === "Administrator" ||
            role === "Moderator" ||
            role === "User"
        ) {
            setFilters(previous => ({
                ...previous,
                role,
            }));
        }
    }

    function handleSortChange(
        event: ChangeEvent<HTMLSelectElement>
    ) {
        const sort = event.target.value;

        if (
            sort === "name-asc" ||
            sort === "name-desc" ||
            sort === "id-asc" ||
            sort === "id-desc"
        ) {
            setFilters(previous => ({
                ...previous,
                sort,
            }));
        }
    }

    function resetFilters() {
        setFilters({ ...defaultFilters });
    }

    if (state.status === "loading") {
        return (
            <section
                className="users-page"
                aria-busy="true"
            >
                <h2>Users</h2>

                <Card>
                    <div className="users-request-state">
                        <div
                            className="users-spinner"
                            aria-hidden="true"
                        />

                        <h3>Loading users...</h3>

                        <p role="status">
                            Retrieving user information
                            from the API.
                        </p>
                    </div>
                </Card>
            </section>
        );
    }

    if (state.status === "error") {
        return (
            <section className="users-page">
                <h2>Users</h2>

                <Card>
                    <div className="users-request-state users-request-state--error">
                        <h3>Unable to load users</h3>

                        <p role="alert">
                            {state.error}
                        </p>

                        <Button onClick={retry}>
                            Retry
                        </Button>
                    </div>
                </Card>
            </section>
        );
    }

    const users = state.data;

    const visibleUsers =
        filterUsers(users, filters);

    const totalUsers = users.length;

    const administrators = users.filter(
        user => user.role === "Administrator"
    ).length;

    const moderators = users.filter(
        user => user.role === "Moderator"
    ).length;

    const standardUsers = users.filter(
        user => user.role === "User"
    ).length;

    return (
        <section className="users-page">
            <h2>Users</h2>

            <p className="users-description">
                Browse demonstration user accounts
                retrieved from the DummyJSON API.
                Showing up to 20 records.
            </p>

            <div className="users-overview-summary">
                <Card>
                    <h3>Loaded Users</h3>
                    <p>{totalUsers}</p>
                </Card>

                <Card>
                    <h3>Administrators</h3>
                    <p>{administrators}</p>
                </Card>

                <Card>
                    <h3>Moderators</h3>
                    <p>{moderators}</p>
                </Card>

                <Card>
                    <h3>Standard Users</h3>
                    <p>{standardUsers}</p>
                </Card>
            </div>

            <Card>
                <div className="users-filter-panel">
                    <h3>Search and Filter</h3>

                    <div className="users-filter-controls">
                        <div className="users-filter-field">
                            <label htmlFor="users-search">
                                Search users
                            </label>

                            <input
                                id="users-search"
                                type="search"
                                placeholder="Search name or email..."
                                value={filters.search}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="users-filter-field">
                            <label htmlFor="users-role">
                                Account role
                            </label>

                            <select
                                id="users-role"
                                value={filters.role}
                                onChange={handleRoleChange}
                            >
                                <option value="all">
                                    All roles
                                </option>

                                <option value="Administrator">
                                    Administrator
                                </option>

                                <option value="Moderator">
                                    Moderator
                                </option>

                                <option value="User">
                                    User
                                </option>
                            </select>
                        </div>

                        <div className="users-filter-field">
                            <label htmlFor="users-sort">
                                Sort by
                            </label>

                            <select
                                id="users-sort"
                                value={filters.sort}
                                onChange={handleSortChange}
                            >
                                <option value="name-asc">
                                    Name A–Z
                                </option>

                                <option value="name-desc">
                                    Name Z–A
                                </option>

                                <option value="id-asc">
                                    User ID Ascending
                                </option>

                                <option value="id-desc">
                                    User ID Descending
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="users-filter-footer">
                        <p
                            className="users-result-count"
                            role="status"
                            aria-live="polite"
                        >
                            Showing {visibleUsers.length} of{" "}
                            {totalUsers} users
                        </p>

                        <div className="users-filter-actions">
                            <Button onClick={resetFilters}>
                                Clear Filters
                            </Button>

                            <Button onClick={retry}>
                                Refresh Users
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {users.length === 0 ? (
                <Card>
                    <div className="users-request-state">
                        <h3>No users available</h3>

                        <p role="status">
                            The API returned an empty
                            user list.
                        </p>

                        <Button onClick={retry}>
                            Refresh Users
                        </Button>
                    </div>
                </Card>
            ) : visibleUsers.length === 0 ? (
                <Card>
                    <div className="users-request-state">
                        <h3>No matching users</h3>

                        <p role="status">
                            Try another search term
                            or change your role filter.
                        </p>

                        <Button onClick={resetFilters}>
                            Clear Filters
                        </Button>
                    </div>
                </Card>
            ) : (
                <div className="users-grid">
                    {visibleUsers.map(user => (
                        <Card key={user.id}>
                            <div className="user-card">
                                <div
                                    className="user-avatar"
                                    aria-hidden="true"
                                >
                                    {user.name
                                        .split(" ")
                                        .map(word => word[0])
                                        .join("")}
                                </div>

                                <h3>{user.name}</h3>

                                <p className="user-email">
                                    {user.email}
                                </p>

                                <span
                                    className={
                                        user.role === "Administrator"
                                            ? "user-status users-role--admin"
                                            : user.role === "Moderator"
                                            ? "user-status users-role--moderator"
                                            : "user-status users-role--standard"
                                    }
                                >
                                    {user.role}
                                </span>

                                <Link
                                    href={`/users/${user.id}`}
                                    className="user-link"
                                    aria-label={`View details for ${user.name}`}
                                >
                                    View Details
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}

export default UsersPage;
