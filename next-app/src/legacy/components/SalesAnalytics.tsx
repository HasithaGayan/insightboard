"use client";

import { useId, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { parseSalesCsv, summarizeSales } from "../utils/salesAnalytics.mjs";
import type { SalesRecord, SalesFilters } from "../utils/salesAnalytics.mjs";
import styles from "./SalesAnalytics.module.css";

const sample = `order_id,date,category,revenue
ORD001,2026-09-01,Electronics,250.00
ORD002,2026-09-05,Clothing,120.00
ORD003,2026-10-03,Electronics,180.00
ORD004,2026-10-09,Home,95.00
ORD005,2026-11-02,Clothing,160.00
ORD006,2026-11-11,Home,210.00`;
const currencies = ["USD", "LKR", "EUR", "GBP", "INR", "AUD", "CAD"];
const emptyFilters: SalesFilters = { startDate: "", endDate: "", category: "" };

function download(name: string, content: string) {
    const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Prevent spreadsheet formula execution when exporting user-supplied labels.
function csvCell(value: string | number) {
    let text = String(value);
    if (typeof value === "string" && /^\s*[=+\-@]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
}

export default function SalesAnalytics() {
    const id = useId();
    const request = useRef(0);
    const fileInput = useRef<HTMLInputElement>(null);
    const [records, setRecords] = useState<SalesRecord[]>([]);
    const [source, setSource] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [filters, setFilters] = useState<SalesFilters>(emptyFilters);
    const [currency, setCurrency] = useState("USD");
    const categories = useMemo(() => Array.from(new Set(records.map(r => r.category))).sort(), [records]);
    const summary = useMemo(() => summarizeSales(records, filters), [records, filters]);
    const invalidRange = Boolean(filters.startDate && filters.endDate && filters.startDate > filters.endDate);
    const money = (cents: number) => new Intl.NumberFormat("en", { style: "currency", currency, currencyDisplay: "code" }).format(cents / 100);

    function install(text: string, name: string) {
        const next = parseSalesCsv(text);
        setRecords(next);
        setSource(name);
        setFilters(emptyFilters);
        setError("");
    }

    async function upload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;
        const version = ++request.current;
        setBusy(true);
        setError("");
        try {
            if (file.size > 5_000_000) throw new Error("Choose a CSV file no larger than 5 MB.");
            const text = await file.text();
            if (version === request.current) install(text, file.name);
        } catch (e) {
            if (version === request.current) setError(e instanceof Error ? e.message : "Unable to read CSV.");
        } finally {
            if (version === request.current) setBusy(false);
        }
    }

    function loadSample() {
        ++request.current;
        setBusy(false);
        install(sample, "Illustrative sample data");
        setCurrency("USD");
    }

    function clear() {
        ++request.current;
        setBusy(false);
        setRecords([]);
        setSource("");
        setError("");
        setFilters(emptyFilters);
        if (fileInput.current) fileInput.current.value = "";
    }

    function exportReport() {
        if (invalidRange || !summary.orderCount) return;
        const rows: (string | number)[][] = [
            ["section", "label", "value", "unit"],
            ["filter", "start_date", filters.startDate || "All", ""],
            ["filter", "end_date", filters.endDate || "All", ""],
            ["filter", "category", filters.category || "All", ""],
            ["summary", "orders", summary.orderCount, "orders"],
            ["summary", "revenue", (summary.revenueCents / 100).toFixed(2), currency],
            ["summary", "average_order_value", (summary.averageOrderCents / 100).toFixed(2), currency],
            ...summary.monthly.map(r => ["month", r.month, (r.revenueCents / 100).toFixed(2), currency]),
            ...summary.categories.map(r => ["category", r.category, (r.revenueCents / 100).toFixed(2), currency]),
        ];
        download("insightboard-sales-report.csv", rows.map(row => row.map(csvCell).join(",")).join("\r\n") + "\r\n");
    }

    function chart(title: string, data: { label: string; value: number }[]) {
        const max = data.reduce((m, r) => Math.max(m, r.value), 1);
        return <div className={styles.chart}>
            <h3>{title}</h3>
            <p className={styles.muted}>{data.length} groups · scroll to see all</p>
            <ul className={styles.bars} aria-label={title}>{data.map(r => <li key={r.label}>
                <div className={styles.barLabel}><span>{r.label}</span><strong>{money(r.value)}</strong></div>
                <div className={styles.track} aria-hidden="true"><div className={styles.bar} style={{ width: `${r.value / max * 100}%` }} /></div>
            </li>)}</ul>
        </div>;
    }

    return <section className={styles.panel} aria-labelledby={`${id}-title`}>
        <div className={styles.header}><div><p className={styles.eyebrow}>BUSINESS ANALYTICS WORKSPACE</p><h2 id={`${id}-title`}>Analyze your sales data</h2><p>Import a CSV to calculate sales metrics, explore trends and export a report.</p></div></div>
        <p className={styles.muted}>Files are processed in your browser by this workspace. No CSV is sent to a server. Data is cleared on reload.</p>
        <div className={styles.actions}>
            <label className={styles.upload} htmlFor={`${id}-file`}>Upload sales CSV</label>
            <input className={styles.file} id={`${id}-file`} ref={fileInput} type="file" accept=".csv,text/csv" onChange={upload} />
            <button type="button" onClick={loadSample}>Try sample data</button>
            <button type="button" onClick={() => download("insightboard-sample.csv", sample)}>Download CSV template</button>
            <button type="button" onClick={clear} disabled={!records.length && !busy && !error}>Clear data</button>
        </div>
        <p className={styles.muted}>Required columns: <code>order_id,date,category,revenue</code>. Use YYYY-MM-DD dates, unique order IDs and non-negative amounts with up to two decimals. One row per order; one currency per file. Up to 50,000 orders / 5 MB.</p>
        {busy && <p role="status">Reading CSV…</p>}
        {error && <p role="alert" className={styles.error}>{error}{records.length > 0 && " Previous dataset retained."}</p>}
        {!records.length ? <div className={styles.empty}>Upload your own file or try the sample to get started.</div> : <>
            <p className={styles.source} role="status">Dataset: <strong>{source}</strong> · {records.length.toLocaleString()} orders</p>
            <div className={styles.filters}>
                <label>From<input type="date" value={filters.startDate} onChange={e => setFilters(p => ({ ...p, startDate: e.target.value }))} /></label>
                <label>To<input type="date" value={filters.endDate} onChange={e => setFilters(p => ({ ...p, endDate: e.target.value }))} /></label>
                <label>Category<select value={filters.category} onChange={e => setFilters(p => ({ ...p, category: e.target.value }))}><option value="">All categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></label>
                <label>Currency (label only)<select value={currency} onChange={e => setCurrency(e.target.value)}>{currencies.map(c => <option key={c}>{c}</option>)}</select></label>
                <button type="button" onClick={() => setFilters(emptyFilters)}>Reset filters</button>
            </div>
            {invalidRange ? <p role="alert" className={styles.error}>The start date must not be after the end date.</p> : <>
                <div className={styles.metrics} aria-live="polite">
                    <div><span>Total revenue</span><strong>{money(summary.revenueCents)}</strong></div>
                    <div><span>Orders</span><strong>{summary.orderCount.toLocaleString()}</strong></div>
                    <div><span>Average order value</span><strong>{money(summary.averageOrderCents)}</strong></div>
                </div>
                {!summary.orderCount ? <p className={styles.empty}>No orders match these filters.</p> : <div className={styles.charts}>
                    {chart("Monthly revenue", summary.monthly.map(r => ({ label: r.month, value: r.revenueCents })))}
                    {chart("Revenue by category", summary.categories.map(r => ({ label: r.category, value: r.revenueCents })))}
                </div>}
            </>}
            <button className={styles.export} type="button" onClick={exportReport} disabled={invalidRange || !summary.orderCount}>Download filtered report (CSV)</button>
        </>}
    </section>;
}
