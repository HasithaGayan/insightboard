
import {
    describe,
    it,
    expect,
    vi,
} from "vitest";

import {
    act,
    renderHook,
} from "@testing-library/react";

import { useAsyncData } from "./useAsyncData";

function deferred<T>() {
    let resolve!: (value: T) => void;
    let reject!: (reason: unknown) => void;

    const promise = new Promise<T>(
        (resolvePromise, rejectPromise) => {
            resolve = resolvePromise;
            reject = rejectPromise;
        }
    );

    return {
        promise,
        resolve,
        reject,
    };
}

describe("useAsyncData", () => {
    it("ignores an obsolete response after retry", async () => {
        const first = deferred<string>();
        const second = deferred<string>();

        const loader = vi
            .fn<(signal: AbortSignal) => Promise<string>>()
            .mockImplementationOnce(
                () => first.promise
            )
            .mockImplementationOnce(
                () => second.promise
            );

        const { result } = renderHook(
            () => useAsyncData(loader)
        );

        expect(result.current.state).toEqual({
            status: "loading",
        });

        const firstSignal =
            loader.mock.calls[0][0];

        act(() => {
            result.current.retry();
        });

        expect(firstSignal.aborted).toBe(true);

        expect(result.current.state).toEqual({
            status: "loading",
        });

        await act(async () => {
            second.resolve("Newest result");
        });

        expect(result.current.state).toEqual({
            status: "success",
            data: "Newest result",
        });

        await act(async () => {
            first.resolve("Obsolete result");
        });

        expect(result.current.state).toEqual({
            status: "success",
            data: "Newest result",
        });
    });

    it("ignores an obsolete error when the loader changes", async () => {
        const first = deferred<string>();
        const second = deferred<string>();

        const firstLoader = vi.fn(
            (_signal: AbortSignal) => first.promise
        );

        const secondLoader = vi.fn(
            (_signal: AbortSignal) => second.promise
        );

        const { result, rerender } = renderHook(
            ({ loader }) => useAsyncData(loader),
            {
                initialProps: {
                    loader: firstLoader,
                },
            }
        );

        const firstSignal =
            firstLoader.mock.calls[0][0];

        rerender({
            loader: secondLoader,
        });

        expect(firstSignal.aborted).toBe(true);

        expect(result.current.state).toEqual({
            status: "loading",
        });

        await act(async () => {
            second.resolve("Current user");
        });

        await act(async () => {
            first.reject(
                new Error("Obsolete request failed")
            );
        });

        expect(result.current.state).toEqual({
            status: "success",
            data: "Current user",
        });
    });

    it("aborts a pending request when unmounted", () => {
        const pending = deferred<string>();

        const loader = vi.fn(
            (_signal: AbortSignal) => pending.promise
        );

        const { unmount } = renderHook(
            () => useAsyncData(loader)
        );

        const signal =
            loader.mock.calls[0][0];

        expect(signal.aborted).toBe(false);

        unmount();

        expect(signal.aborted).toBe(true);
    });
});
