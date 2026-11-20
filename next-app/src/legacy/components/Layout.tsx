
import type { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
    children: ReactNode;
}

const currentYear = new Date().getFullYear();

function Layout({ children }: LayoutProps) {
    return (
        <div className="app-layout">
            <Header />

            <main className="main-content">
                {children}
            </main>

            <footer className="app-footer">
                <p>
                    &copy; {currentYear} InsightBoard.
                    All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default Layout;
