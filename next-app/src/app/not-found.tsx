import Link from "next/link";
import Card from "@/legacy/components/Card";

export default function NotFound() {
    return (
        <section>
            <Card>
                <h2>404 — Page Not Found</h2>
                <p>The requested page does not exist.</p>
                <Link className="navigation-link" href="/">Return to Dashboard</Link>
            </Card>
        </section>
    );
}
