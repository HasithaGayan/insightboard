import type { Metadata } from "next";
import SettingsPage from "@/legacy/pages/SettingsPage";

export const metadata: Metadata = {
    title: "Settings",
    description: "Customize InsightBoard chart and statistics visibility in your browser.",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <SettingsPage />;
}
