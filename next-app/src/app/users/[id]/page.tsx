import type { Metadata } from "next";
import UserDetailsPage from "@/legacy/pages/UserDetailsPage";

export const metadata: Metadata = {
    title: "User Details",
    robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <UserDetailsPage id={id} />;
}
