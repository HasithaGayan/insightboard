
import type { FeedbackFormValues } from "../types/feedback";

export async function submitFeedback(
    values: FeedbackFormValues
): Promise<void> {
    // Simulate network latency.
    await new Promise<void>(resolve => {
        window.setTimeout(resolve, 1500);
    });

    // Simulate a predictable submission failure.
    if (
        values.email.trim().toLowerCase() ===
        "fail@example.com"
    ) {
        throw new Error(
            "Submission failed. Please try again."
        );
    }

    // Simulated successful submission.
    // Real API integration will be added later.
}
