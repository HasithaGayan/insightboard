
import { createContext, useContext } from "react";

export interface DashboardPreferences {
    showChanges: boolean;
    showStats: boolean;
}

export interface PreferencesContextValue {
    preferences: DashboardPreferences;
    toggleChanges: () => void;
    toggleStatistics: () => void;
    resetPreferences: () => void;
}

export const PreferencesContext =
    createContext<PreferencesContextValue | null>(null);

export function usePreferences() {
    const context = useContext(PreferencesContext);

    if (context === null) {
        throw new Error(
            "usePreferences must be used inside PreferencesProvider."
        );
    }

    return context;
}
