"use client";

import { useId, useState } from "react";

import type { ChangeEvent } from "react";

import Card from "./Card";

import { revenueTrend } from "../data/revenueTrend";


type RevenuePeriod = "3" | "6";

const currencyFormatter = new Intl.NumberFormat(
    "en-US",
    {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }
);

const maximumRevenue = Math.max(
    ...revenueTrend.map(record => record.revenue),
    1
);

function RevenueChart() {
    const periodId = useId();

    const [period, setPeriod] =
        useState<RevenuePeriod>("6");

    const visibleRecords = revenueTrend.slice(
        -Number(period)
    );

    function handlePeriodChange(
        event: ChangeEvent<HTMLSelectElement>
    ) {
        const value = event.target.value;

        if (value === "3" || value === "6") {
            setPeriod(value);
        }
    }

    return (
        <Card>
            <div className="revenue-chart">
                <div className="revenue-chart-header">
                    <div>
                        <h3>Monthly Revenue</h3>

                        <p className="revenue-chart-description">
                            Demonstration revenue history in USD.
                        </p>
                    </div>

                    <div className="revenue-period">
                        <label htmlFor={periodId}>
                            Time period
                        </label>

                        <select
                            id={periodId}
                            value={period}
                            onChange={handlePeriodChange}
                        >
                            <option value="6">
                                Last 6 months
                            </option>

                            <option value="3">
                                Last 3 months
                            </option>
                        </select>
                    </div>
                </div>

                <p
                    className="revenue-chart-count"
                    role="status"
                >
                    Showing {visibleRecords.length} months
                </p>

                {visibleRecords.length === 0 ? (
                    <p className="empty-state">
                        No revenue data available.
                    </p>
                ) : (
                    <ul
                        className="revenue-chart-list"
                        aria-label="Monthly revenue values"
                    >
                        {visibleRecords.map(record => (
                            <li
                                key={record.month}
                                className="revenue-chart-row"
                            >
                                <div className="revenue-chart-label">
                                    <span>
                                        {record.month}
                                    </span>

                                    <strong>
                                        {currencyFormatter.format(
                                            record.revenue
                                        )}
                                    </strong>
                                </div>

                                <div
                                    className="revenue-chart-track"
                                    aria-hidden="true"
                                >
                                    <div
                                        className="revenue-chart-bar"
                                        style={{
                                            width: `${
                                                record.revenue /
                                                maximumRevenue *
                                                100
                                            }%`,
                                        }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <p className="revenue-chart-note">
                    Illustrative business metrics.
                    This chart does not represent live
                    financial data.
                </p>
            </div>
        </Card>
    );
}

export default RevenueChart;
