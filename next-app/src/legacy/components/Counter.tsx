"use client";

import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

function Counter() {
    const [count, setCount] = useState<number>(0);

    function increaseCount() {
        setCount((previousCount) => previousCount + 1);
    }

    function decreaseCount() {
        setCount((previousCount) =>
            Math.max(0, previousCount - 1)
        );
    }

    function resetCount() {
        setCount(0);
    }

    return (
        <Card>
            <h3>Counter Practice</h3>

            <p>{count}</p>

            <Button
                onClick={decreaseCount}
                disabled={count === 0}
            >
                Decrease
            </Button>

            <Button onClick={increaseCount}>
                Increase
            </Button>

            <Button onClick={resetCount}>
                Reset
            </Button>
        </Card>
    );
}

export default Counter;
