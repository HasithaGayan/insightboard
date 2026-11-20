import type { Metadata } from "next";
import DashboardPage from "@/legacy/pages/DashboardPage";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Explore business metrics, revenue trends, a persistent watchlist and demonstration feedback in InsightBoard.",
};

export default function Page() {
    return <DashboardPage />;
}
