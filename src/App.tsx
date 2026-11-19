
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import StatCard from "./components/StatCard";
import Button from "./components/Button";
import Counter from "./components/Counter";
import Watchlist from "./components/Watchlist";
import ProjectInfoDialog from "./components/ProjectInfoDialog";
import { dashboardStats } from "./data/dashboardStats";
import "./App.css";

interface DashboardPreferences {
    showChanges: boolean;
    showStats: boolean;
}

const STORAGE_KEY = "insightboard-preferences";

const defaultPreferences: DashboardPreferences = {
    showChanges: true,
    showStats: true,
};

function loadPreferences(): DashboardPreferences {
    try {
        const savedPreferences =
            localStorage.getItem(STORAGE_KEY);

        if (savedPreferences === null) {
            return defaultPreferences;
        }

        const parsed: unknown =
            JSON.parse(savedPreferences);

        if (
            typeof parsed === "object" &&
            parsed !== null &&
            "showChanges" in parsed &&
            typeof parsed.showChanges === "boolean" &&
            "showStats" in parsed &&
            typeof parsed.showStats === "boolean"
        ) {
            return {
                showChanges: parsed.showChanges,
                showStats: parsed.showStats,
            };
        }
    } catch (error) {
        console.warn(
            "Could not load dashboard preferences.",
            error
        );
    }

    return defaultPreferences;
}

function App() {
    const [preferences, setPreferences] =
        useState<DashboardPreferences>(loadPreferences);

    const [isInfoOpen, setIsInfoOpen] =
        useState<boolean>(false);

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(preferences)
            );
        } catch (error) {
            console.warn(
                "Could not save dashboard preferences.",
                error
            );
        }
    }, [preferences]);

    function toggleChanges() {
        setPreferences((previousPreferences) => ({
            ...previousPreferences,
            showChanges: !previousPreferences.showChanges,
        }));
    }

    function toggleStatistics() {
        setPreferences((previousPreferences) => ({
            ...previousPreferences,
            showStats: !previousPreferences.showStats,
        }));
    }

    function resetPreferences() {
        setPreferences({ ...defaultPreferences });
    }

    return (
        <Layout>
            <section>
                <h2>Dashboard Overview</h2>

                <Button onClick={toggleChanges}>
                    {preferences.showChanges
                        ? "Hide Changes"
                        : "Show Changes"}
                </Button>

                <Button onClick={toggleStatistics}>
                    {preferences.showStats
                        ? "Hide Statistics"
                        : "Show Statistics"}
                </Button>

                <Button onClick={resetPreferences}>
                    Reset Preferences
                </Button>

                {!preferences.showStats && (
                    <p className="empty-state">
                        Statistics hidden by your display preferences.
                    </p>
                )}

                {preferences.showStats && (
                    <>
                        {dashboardStats.length === 0 ? (
                            <p className="empty-state">
                                No dashboard statistics available.
                            </p>
                        ) : (
                            <div className="stats-grid">
                                {dashboardStats.map((stat) => (
                                    <StatCard
                                        key={stat.id}
                                        title={stat.title}
                                        value={stat.value}
                                        change={
                                            preferences.showChanges
                                                ? stat.change
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                <Button
                    onClick={() => setIsInfoOpen(true)}
                >
                    View Project Info
                </Button>

                <Button disabled>
                    Export Report
                </Button>
            </section>

            <section>
                <h2>Watchlist</h2>
                <Watchlist />
            </section>

            <section>
                <h2>React State Practice</h2>
                <Counter />
            </section>

            <ProjectInfoDialog
                isOpen={isInfoOpen}
                onClose={() => setIsInfoOpen(false)}
            />
        </Layout>
    );
}

export default App;
