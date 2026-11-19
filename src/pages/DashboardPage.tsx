
import { useState } from "react";

import StatCard from "../components/StatCard";
import Button from "../components/Button";
import Counter from "../components/Counter";
import Watchlist from "../components/Watchlist";
import ProjectInfoDialog from "../components/ProjectInfoDialog";
import FeedbackForm from "../components/FeedbackForm";

import { dashboardStats } from "../data/dashboardStats";
import { usePreferences } from "../context/preferencesContext";

function DashboardPage() {
    const {
        preferences,
        toggleChanges,
        toggleStatistics,
        resetPreferences,
    } = usePreferences();

    const [isInfoOpen, setIsInfoOpen] =
        useState<boolean>(false);

    return (
        <>
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
                        Statistics hidden by your display
                        preferences.
                    </p>
                )}

                {preferences.showStats && (
                    <>
                        {dashboardStats.length === 0 ? (
                            <p className="empty-state">
                                No dashboard statistics
                                available.
                            </p>
                        ) : (
                            <div className="stats-grid">
                                {dashboardStats.map(stat => (
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
                <h2>Feedback and Support</h2>
                <FeedbackForm />
            </section>

            <section>
                <h2>React State Practice</h2>
                <Counter />
            </section>

            <ProjectInfoDialog
                isOpen={isInfoOpen}
                onClose={() => setIsInfoOpen(false)}
            />
        </>
    );
}

export default DashboardPage;
