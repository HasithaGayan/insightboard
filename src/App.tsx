
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Link,
} from "react-router";

import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import Card from "./components/Card";

import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import SettingsPage from "./pages/SettingsPage";

import PreferencesProvider from "./context/PreferencesProvider";

import "./App.css";

function DashboardLayout() {
    return (
        <Layout>
            <Navigation />
            <Outlet />
        </Layout>
    );
}

function App() {
    return (
        <PreferencesProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<DashboardLayout />}>
                        <Route
                            index
                            element={<DashboardPage />}
                        />

                        <Route
                            path="users"
                            element={<UsersPage />}
                        />

                        <Route
                            path="users/:id"
                            element={<UserDetailsPage />}
                        />

                        <Route
                            path="settings"
                            element={<SettingsPage />}
                        />

                        <Route
                            path="*"
                            element={
                                <section>
                                    <Card>
                                        <h3>
                                            404 — Page Not Found
                                        </h3>

                                        <p>
                                            The requested page
                                            does not exist.
                                        </p>

                                        <Link
                                            className="navigation-link"
                                            to="/"
                                        >
                                            Return to Dashboard
                                        </Link>
                                    </Card>
                                </section>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </PreferencesProvider>
    );
}

export default App;
