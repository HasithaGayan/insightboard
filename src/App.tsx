
import Layout from "./components/Layout";
import StatCard from "./components/StatCard";
import Button from "./components/Button";
import { dashboardStats } from "./data/dashboardStats";
import "./App.css";

function App() {
    return (
        <Layout>
            <section>
                <h2>Dashboard Overview</h2>

                {dashboardStats.length === 0 ? (
                    <p className="empty-state">
                        No dashboard statistics available.
                    </p>
                ) : (
                    <div className="stats-grid">
                        {dashboardStats.map((stat) => (
                            <StatCard
                                key={stat.id}
                                title={stat.title}
                                value={stat.value}
                                change={stat.change}
                            />
                        ))}
                    </div>
                )}

                <Button
                    onClick={() =>
                        alert("InsightBoard displays demonstration data.")
                    }
                >
                    View Project Info
                </Button>

                <Button disabled>
                    Export Report
                </Button>
            </section>
        </Layout>
    );
}

export default App;
