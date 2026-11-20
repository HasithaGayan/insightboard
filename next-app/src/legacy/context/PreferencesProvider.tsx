"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { PreferencesContext } from "./preferencesContext";

import type {
    DashboardPreferences,
} from "./preferencesContext";

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

interface PreferencesProviderProps {
    children: ReactNode;
}

function PreferencesProvider({
    children,
}: PreferencesProviderProps) {
    // Match the server's initial HTML to avoid hydration mismatches.
    const [preferences, setPreferences] =
        useState<DashboardPreferences>(defaultPreferences);
    const restored = useRef(false);

    // Restore browser settings after hydration, without overwriting them first.
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            const saved = loadPreferences();
            restored.current = true;
            setPreferences(saved);
        });
        return () => window.cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (!restored.current) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        } catch (error) {
            console.warn("Could not save dashboard preferences.", error);
        }
    }, [preferences]);

    function toggleChanges() {
        setPreferences(previous => ({
            ...previous,
            showChanges: !previous.showChanges,
        }));
    }

    function toggleStatistics() {
        setPreferences(previous => ({
            ...previous,
            showStats: !previous.showStats,
        }));
    }

    function resetPreferences() {
        setPreferences({ ...defaultPreferences });
    }

    return (
        <PreferencesContext.Provider
            value={{
                preferences,
                toggleChanges,
                toggleStatistics,
                resetPreferences,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
}

export default PreferencesProvider;
