import type { Metadata } from "next";
import type { ReactNode } from "react";
import Layout from "@/legacy/components/Layout";
import Navigation from "@/legacy/components/Navigation";
import PreferencesProvider from "@/legacy/context/PreferencesProvider";
import PageFocus from "@/components/PageFocus";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "InsightBoard | Analytics Dashboard",
        template: "%s | InsightBoard",
    },
    description: "InsightBoard is a responsive business analytics showcase built with Next.js, React and TypeScript.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <PreferencesProvider>
                    <Layout>
                        <Navigation />
                        <PageFocus>{children}</PageFocus>
                    </Layout>
                </PreferencesProvider>
            </body>
        </html>
    );
}
