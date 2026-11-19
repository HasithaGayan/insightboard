
import { Link, useParams } from "react-router";
import Card from "../components/Card";
import { users } from "../data/users";
import "./UsersPage.css";

function UserDetailsPage() {
    const { id } = useParams<"id">();

    const user = users.find(
        record => String(record.id) === id
    );

    if (!user) {
        return (
            <section className="users-page">
                <h2>User Not Found</h2>

                <Card>
                    <div className="user-not-found">
                        <h3>Account unavailable</h3>

                        <p>
                            The requested user does not exist
                            in our demo dataset.
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
                        <div className="user-avatar">
                            {user.name
                                .split(" ")
                                .map(word => word[0])
                                .join("")}
                        </div>

                        <div>
                            <h3>{user.name}</h3>

                            <span
                                className={
                                    user.status === "Active"
                                        ? "user-status user-status--active"
                                        : "user-status user-status--inactive"
                                }
                            >
                                {user.status}
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

                        <div>
                            <dt>Account status</dt>
                            <dd>{user.status}</dd>
                        </div>

                        <div>
                            <dt>Joined date</dt>
                            <dd>{user.joinedAt}</dd>
                        </div>
                    </dl>

                    <p className="user-demo-note">
                        This page displays demonstration
                        user information.
                    </p>
                </div>
            </Card>
        </section>
    );
}

export default UserDetailsPage;
