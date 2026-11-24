"use client";

import StatCard from "../components/StatCard";
import Button from "../components/Button";
import Watchlist from "../components/Watchlist";
import FeedbackForm from "../components/FeedbackForm";
import DashboardActions from "../components/DashboardActions";
import RevenueChart from "../components/RevenueChart";
import SalesAnalytics from "../components/SalesAnalytics";

import { dashboardStats } from "../data/dashboardStats";
import { usePreferences } from "../context/preferencesContext";

function DashboardPage() {
    const {
        preferences,
        toggleChanges,
        toggleStatistics,
        resetPreferences,
    } = usePreferences();

    return (
        <>
            <section>
                <h2>Dashboard Overview</h2>
                <SalesAnalytics />
                <h3>Demonstration Dashboard</h3>
                <p>The following original statistics use illustrative data.</p>

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

                <DashboardActions />
            </section>

            {preferences.showStats && (
                <section>
                    <h2>Revenue Trend</h2>
                    <RevenueChart />
                </section>
            )}

            <section>
                <h2>Watchlist</h2>
                <Watchlist />
            </section>

            <section>
                <h2>Feedback and Support</h2>
                <FeedbackForm />
            </section>
        </>
    );
}

export default DashboardPage;
