
import Card from "./Card";

interface StatCardProps {
    title: string;
    value: string;
    change?: string;
}

function StatCard({ title, value, change }: StatCardProps) {
    return (
        <Card>
            <h3>{title}</h3>
            <p>{value}</p>
            {change && <small>{change}</small>}
        </Card>
    );
}

export default StatCard;
