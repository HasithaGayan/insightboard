"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
    return (
        <section className="card" role="alert">
            <h2>Something went wrong</h2>
            <p>InsightBoard could not render this page. Please try again.</p>
            <button type="button" onClick={reset}>Try Again</button>
        </section>
    );
}
