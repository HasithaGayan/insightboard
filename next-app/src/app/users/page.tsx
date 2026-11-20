import type { Metadata } from "next";
import UsersPage from "@/legacy/pages/UsersPage";

export const metadata: Metadata = {
    title: "Users",
    description: "Browse and filter fictional user accounts retrieved through the InsightBoard server API.",
};

export default function Page() {
    return <UsersPage />;
}
