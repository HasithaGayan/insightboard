"use client";

import { useState, useEffect } from "react";

export type AsyncState<T> =
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: string };

type Loader<T> = (
    signal: AbortSignal
) => Promise<T>;

interface RequestResult<T> {
    attempt: number;
    loader: Loader<T>;

    state:
        | { status: "success"; data: T }
        | { status: "error"; error: string };
}

export function useAsyncData<T>(
    loader: Loader<T>
) {
    const [attempt, setAttempt] =
        useState(0);

    const [result, setResult] =
        useState<RequestResult<T> | null>(null);

    const state: AsyncState<T> =
        result !== null &&
        result.attempt === attempt &&
        result.loader === loader
            ? result.state
            : { status: "loading" };

    useEffect(() => {
        const controller = new AbortController();

        async function loadData() {
            try {
                const data = await loader(
                    controller.signal
                );

                if (!controller.signal.aborted) {
                    setResult({
                        attempt,
                        loader,
                        state: {
                            status: "success",
                            data,
                        },
                    });
                }
            } catch (error: unknown) {
                if (!controller.signal.aborted) {
                    setResult({
                        attempt,
                        loader,
                        state: {
                            status: "error",
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "An unexpected error occurred.",
                        },
                    });
                }
            }
        }

        void loadData();

        return () => {
            controller.abort();
        };
    }, [loader, attempt]);

    function retry() {
        setAttempt(previous => previous + 1);
    }

    return {
        state,
        retry,
    };
}
