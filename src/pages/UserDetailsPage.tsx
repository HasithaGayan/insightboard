
import { useCallback } from "react";
import { Link, useParams } from "react-router";

import Card from "../components/Card";
import Button from "../components/Button";

import { fetchUserById } from "../services/userService";
import { useAsyncData } from "../hooks/useAsyncData";

import "./UsersPage.css";

interface UserDetailsContentProps {
    id: string;
}

function UserDetailsContent({
    id,
}: UserDetailsContentProps) {
    const loadUser = useCallback(
        (signal: AbortSignal) =>
            fetchUserById(id, signal),
        [id]
    );

    const { state, retry } =
        useAsyncData(loadUser);

    if (state.status === "loading") {
        return (
            <section className="users-page">
                <h2>User Details</h2>

                <Card>
                    <div className="user-not-found">
                        <h3>Loading user...</h3>

                        <p role="status">
                            Retrieving account information.
                        </p>

                        <Link
                            to="/users"
                            className="user-link"
                        >
                            Back to Users
                        </Link>
                    </div>
                </Card>
            </section>
        );
    }

    if (state.status === "error") {
        return (
            <section className="users-page">
                <h2>User Details</h2>

                <Card>
                    <div className="user-not-found">
                        <h3>Unable to load user</h3>

                        <p role="alert">{state.error}</p>

                        <Button onClick={retry}>
                            Retry
                        </Button>

                        <Link
                            to="/users"
                            className="user-link"
                        >
                            Back to Users
                        </Link>
                    </div>
                </Card>
            </section>
        );
    }

    const user = state.data;

    if (user === null) {
        return (
            <section className="users-page">
                <h2>User Not Found</h2>

                <Card>
                    <div className="user-not-found">
                        <h3>Account unavailable</h3>

                        <p>
                            The requested user does not exist.
                        </p>

                        <Link
                            to="/users"
                            className="user-link"
                        >
                            Return to Users
                        </Link>
                    </div>
                </Card>
            </section>
        );
    }

    return (
        <section className="users-page">
            <Link
                to="/users"
                className="user-back-link"
            >
                &larr; Back to Users
            </Link>

            <h2>User Details</h2>

            <Card>
                <div className="user-details">
                    <div className="user-profile-header">
                        <div
                            className="user-avatar"
                            aria-hidden="true"
                        >
                            {user.name
                                .split(" ")
                                .map(word => word[0])
                                .join("")}
                        </div>

                        <div>
                            <h3>{user.name}</h3>

                            <span className="user-status user-status--inactive">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <dl className="user-details-grid">
                        <div>
                            <dt>User ID</dt>
                            <dd>#{user.id}</dd>
                        </div>

                        <div>
                            <dt>Full name</dt>
                            <dd>{user.name}</dd>
                        </div>

                        <div>
                            <dt>Email address</dt>
                            <dd>{user.email}</dd>
                        </div>

                        <div>
                            <dt>Account role</dt>
                            <dd>{user.role}</dd>
                        </div>
                    </dl>

                    <p className="user-demo-note">
                        Fictional user information retrieved
                        from the DummyJSON API.
                    </p>
                </div>
            </Card>
        </section>
    );
}

function UserDetailsPage() {
    const { id } = useParams<"id">();

    return (
        <UserDetailsContent
            key={id ?? ""}
            id={id ?? ""}
        />
    );
}

export default UserDetailsPage;
