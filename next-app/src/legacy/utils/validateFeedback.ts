
import type {
    FeedbackFormValues,
    FeedbackFormErrors,
} from "../types/feedback";

export function validateFeedback(
    values: FeedbackFormValues
): FeedbackFormErrors {
    const errors: FeedbackFormErrors = {};

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    // Name validation
    if (name.length === 0) {
        errors.name = "Please enter your name.";
    } else if (name.length < 2) {
        errors.name =
            "Name must contain at least 2 characters.";
    } else if (name.length > 80) {
        errors.name =
            "Name cannot exceed 80 characters.";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0) {
        errors.email =
            "Please enter your email address.";
    } else if (!emailPattern.test(email)) {
        errors.email =
            "Please enter a valid email address.";
    }

    // Category validation
    if (
        values.category !== "general" &&
        values.category !== "bug" &&
        values.category !== "feature"
    ) {
        errors.category =
            "Please select a feedback category.";
    }

    // Message validation
    if (message.length === 0) {
        errors.message = "Please enter your message.";
    } else if (message.length < 10) {
        errors.message =
            "Message must contain at least 10 characters.";
    } else if (message.length > 500) {
        errors.message =
            "Message cannot exceed 500 characters.";
    }

    return errors;
}
