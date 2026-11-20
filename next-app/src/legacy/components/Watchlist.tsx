"use client";

import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import Card from "./Card";
import Button from "./Button";

interface WatchlistItem {
    id: number;
    name: string;
    active: boolean;
}

type StatusFilter = "all" | "active" | "paused";
type SortOrder = "default" | "asc" | "desc";

const STORAGE_KEY = "insightboard-watchlist";

const initialItems: WatchlistItem[] = [
    { id: 1, name: "Revenue", active: true },
    { id: 2, name: "Users", active: true },
    { id: 3, name: "Orders", active: false },
];

function isWatchlistItem(
    value: unknown
): value is WatchlistItem {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        typeof value.id === "number" &&
        Number.isSafeInteger(value.id) &&
        value.id > 0 &&
        "name" in value &&
        typeof value.name === "string" &&
        value.name.trim() !== "" &&
        "active" in value &&
        typeof value.active === "boolean"
    );
}

function loadWatchlist(): WatchlistItem[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved === null) {
            return initialItems;
        }

        const parsed: unknown = JSON.parse(saved);

        if (
            Array.isArray(parsed) &&
            parsed.every(isWatchlistItem)
        ) {
            const ids = new Set(
                parsed.map((item) => item.id)
            );

            const names = new Set(
                parsed.map((item) =>
                    item.name.trim().toLowerCase()
                )
            );

            if (
                ids.size === parsed.length &&
                names.size === parsed.length
            ) {
                return parsed;
            }
        }
    } catch (error) {
        console.warn(
            "Could not load watchlist.",
            error
        );
    }

    return initialItems;
}

function Watchlist() {
    // Start with identical server/client markup, then restore saved data.
    const [items, setItems] =
        useState<WatchlistItem[]>(initialItems);
    const restored = useRef(false);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            const saved = loadWatchlist();
            restored.current = true;
            setItems(saved);
        });
        return () => window.cancelAnimationFrame(frame);
    }, []);

    const [metricName, setMetricName] = useState("");
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("all");

    const [sortOrder, setSortOrder] =
        useState<SortOrder>("default");

    useEffect(() => {
        if (!restored.current) return;
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(items)
            );
        } catch (error) {
            console.warn(
                "Could not save watchlist.",
                error
            );
        }
    }, [items]);

    const totalMetrics = items.length;

    const monitoringMetrics = items.filter(
        (item) => item.active
    ).length;

    const pausedMetrics = items.filter(
        (item) => !item.active
    ).length;

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && item.active) ||
            (statusFilter === "paused" && !item.active);

        return matchesSearch && matchesStatus;
    });

    const sortedItems = [...filteredItems].sort(
        (first, second) => {
            if (sortOrder === "asc") {
                return first.name.localeCompare(second.name);
            }

            if (sortOrder === "desc") {
                return second.name.localeCompare(first.name);
            }

            return first.id - second.id;
        }
    );

    function handleNameChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        setMetricName(event.target.value);
        setError("");
    }

    function handleSearchChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        setSearchQuery(event.target.value);
    }

    function handleStatusChange(
        event: ChangeEvent<HTMLSelectElement>
    ) {
        const value = event.target.value;

        if (
            value === "all" ||
            value === "active" ||
            value === "paused"
        ) {
            setStatusFilter(value);
        }
    }

    function handleSortChange(
        event: ChangeEvent<HTMLSelectElement>
    ) {
        const value = event.target.value;

        if (
            value === "default" ||
            value === "asc" ||
            value === "desc"
        ) {
            setSortOrder(value);
        }
    }

    function handleSubmit(
        event: SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const trimmedName = metricName.trim();

        if (trimmedName === "") {
            setError("Please enter a metric name.");
            return;
        }

        const alreadyExists = items.some(
            (item) =>
                item.name.trim().toLowerCase() ===
                trimmedName.toLowerCase()
        );

        if (alreadyExists) {
            setError("This metric already exists.");
            return;
        }

        const nextId =
            items.reduce(
                (highestId, item) =>
                    Math.max(highestId, item.id),
                0
            ) + 1;

        if (!Number.isSafeInteger(nextId)) {
            setError("Could not generate a new metric ID.");
            return;
        }

        const newItem: WatchlistItem = {
            id: nextId,
            name: trimmedName,
            active: true,
        };

        setItems((previousItems) => [
            ...previousItems,
            newItem,
        ]);

        setMetricName("");
        setError("");
        clearFilters();
    }

    function toggleItem(id: number) {
        setItems((previousItems) =>
            previousItems.map((item) =>
                item.id === id
                    ? { ...item, active: !item.active }
                    : item
            )
        );
    }

    function deleteItem(id: number) {
        setItems((previousItems) =>
            previousItems.filter((item) => item.id !== id)
        );
    }

    function clearFilters() {
        setSearchQuery("");
        setStatusFilter("all");
        setSortOrder("default");
    }

    function resetWatchlist() {
        setItems(initialItems);
        setMetricName("");
        setError("");
        clearFilters();
    }

    return (
        <Card>
            <h3>Dashboard Watchlist</h3>

            <div className="watchlist-summary">
                <div>
                    <span>Total Metrics</span>
                    <p>{totalMetrics}</p>
                </div>

                <div>
                    <span>Monitoring</span>
                    <p>{monitoringMetrics}</p>
                </div>

                <div>
                    <span>Paused</span>
                    <p>{pausedMetrics}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="metric-name">
                    Metric name
                </label>

                <input
                    id="metric-name"
                    type="text"
                    placeholder="Enter metric name"
                    value={metricName}
                    onChange={handleNameChange}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? "metric-error" : undefined
                    }
                />

                <Button type="submit">
                    Add Metric
                </Button>

                {error && (
                    <div id="metric-error" role="alert">
                        {error}
                    </div>
                )}
            </form>

            <div className="watchlist-filters">
                <label htmlFor="metric-search">
                    Search metrics
                </label>

                <input
                    id="metric-search"
                    type="search"
                    placeholder="Search metrics..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

                <label htmlFor="status-filter">
                    Status
                </label>

                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={handleStatusChange}
                >
                    <option value="all">All</option>
                    <option value="active">Monitoring</option>
                    <option value="paused">Paused</option>
                </select>

                <label htmlFor="sort-order">
                    Sort by
                </label>

                <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={handleSortChange}
                >
                    <option value="default">Default</option>
                    <option value="asc">Name A-Z</option>
                    <option value="desc">Name Z-A</option>
                </select>

                <Button onClick={clearFilters}>
                    Clear Filters
                </Button>
            </div>

            <p>
                Showing {sortedItems.length} of {totalMetrics} metrics
            </p>

            {items.length === 0 ? (
                <div className="empty-state">
                    No metrics in your watchlist.
                </div>
            ) : sortedItems.length === 0 ? (
                <div className="empty-state">
                    No matching metrics found.
                </div>
            ) : (
                <ul>
                    {sortedItems.map((item) => (
                        <li key={item.id}>
                            <h4>{item.name}</h4>

                            <span>
                                {item.active
                                    ? "Monitoring"
                                    : "Paused"}
                            </span>

                            <div>
                                <Button
                                    onClick={() =>
                                        toggleItem(item.id)
                                    }
                                >
                                    {item.active
                                        ? "Pause"
                                        : "Resume"}
                                </Button>

                                <Button
                                    onClick={() =>
                                        deleteItem(item.id)
                                    }
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <Button onClick={resetWatchlist}>
                Reset Watchlist
            </Button>
        </Card>
    );
}

export default Watchlist;
