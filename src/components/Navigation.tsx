
import { NavLink } from "react-router";
import "./Navigation.css";

const navigationItems = [
    {
        label: "Dashboard",
        path: "/",
    },
    {
        label: "Users",
        path: "/users",
    },
    {
        label: "Settings",
        path: "/settings",
    },
];

function Navigation() {
    return (
        <nav
            className="dashboard-navigation"
            aria-label="Main navigation"
        >
            {navigationItems.map(item => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                        isActive
                            ? "navigation-link navigation-link--active"
                            : "navigation-link"
                    }
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
}

export default Navigation;
