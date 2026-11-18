
import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

function Card({ children }: CardProps) {
    return (
        <article className="card">
            {children}
        </article>
    );
}

export default Card;
