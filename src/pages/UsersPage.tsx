
import { Link } from "react-router";
import Card from "../components/Card";
import { users } from "../data/users";
import "./UsersPage.css";

function UsersPage() {
    const totalUsers = users.length;

    const activeUsers = users.filter(
        user => user.status === "Active"
    ).length;

    const inactiveUsers = totalUsers - activeUsers;

    return (
        <section className="users-page">
            <h2>Users</h2>

            <p className="users-description">
                Explore user accounts and access
                individual user information.
            </p>

            <div className="user-summary">
                <Card>
                    <h3>Demo Users</h3>
                    <p>{totalUsers}</p>
                </Card>

                <Card>
                    <h3>Active</h3>
                    <p>{activeUsers}</p>
                </Card>

                <Card>
                    <h3>Inactive</h3>
                    <p>{inactiveUsers}</p>
                </Card>
            </div>

            {users.length === 0 ? (
                <p className="empty-state">
                    No users available.
                </p>
            ) : (
                <div className="users-grid">
                    {users.map(user => (
                        <Card key={user.id}>
                            <div className="user-card">
                                <div className="user-avatar">
                                    {user.name
                                        .split(" ")
                                        .map(word => word[0])
                                        .join("")}
                                </div>

                                <h3>{user.name}</h3>

                                <p className="user-email">
                                    {user.email}
                                </p>

                                <p className="user-role">
                                    {user.role}
                                </p>

                                <span
                                    className={
                                        user.status === "Active"
                                            ? "user-status user-status--active"
                                            : "user-status user-status--inactive"
                                    }
                                >
                                    {user.status}
                                </span>

                                <Link
                                    to={`/users/${user.id}`}
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
