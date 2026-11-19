
import Card from "../components/Card";
import Button from "../components/Button";

import { usePreferences } from "../context/preferencesContext";

import "./SettingsPage.css";

function SettingsPage() {
    const {
        preferences,
        toggleChanges,
        toggleStatistics,
        resetPreferences,
    } = usePreferences();

    return (
        <section className="settings-page">
            <h2>Settings</h2>

            <p className="settings-description">
                Customize your InsightBoard experience.
            </p>

            <Card>
                <div className="settings-panel">
                    <h3>Display Preferences</h3>

                    <p className="settings-description">
                        Control how dashboard statistics
                        are displayed.
                    </p>

                    <div className="settings-row">
                        <div className="settings-text">
                            <label htmlFor="show-statistics">
                                Show statistics
                            </label>

                            <p id="statistics-description">
                                Display business performance
                                cards on the dashboard.
                            </p>
                        </div>

                        <div className="settings-toggle">
                            <input
                                id="show-statistics"
                                type="checkbox"
                                checked={preferences.showStats}
                                onChange={toggleStatistics}
                                aria-describedby="statistics-description"
                            />
                        </div>
                    </div>

                    <div className="settings-row">
                        <div className="settings-text">
                            <label htmlFor="show-changes">
                                Show percentage changes
                            </label>

                            <p id="changes-description">
                                Display percentage changes
                                when statistics are visible.
                            </p>
                        </div>

                        <div className="settings-toggle">
                            <input
                                id="show-changes"
                                type="checkbox"
                                checked={preferences.showChanges}
                                onChange={toggleChanges}
                                aria-describedby="changes-description"
                            />
                        </div>
                    </div>

                    <div className="settings-note">
                        Preferences are shared with the
                        dashboard and saved locally in
                        this browser when storage is
                        available.
                    </div>

                    <div className="settings-actions">
                        <Button onClick={resetPreferences}>
                            Reset to Defaults
                        </Button>
                    </div>
                </div>
            </Card>
        </section>
    );
}

export default SettingsPage;
