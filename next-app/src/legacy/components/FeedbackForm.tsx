"use client";

import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

import type {
    FeedbackFormValues,
    FeedbackFormErrors,
} from "../types/feedback";

import { validateFeedback } from "../utils/validateFeedback";
import { submitFeedback } from "../services/feedbackService";

import Card from "./Card";
import Button from "./Button";
import FormField from "./FormField";

const initialValues: FeedbackFormValues = {
    name: "",
    email: "",
    category: "",
    message: "",
};

const fieldOrder: (keyof FeedbackFormValues)[] = [
    "name",
    "email",
    "category",
    "message",
];

type SubmissionStatus =
    | "idle"
    | "pending"
    | "success"
    | "failure";

interface FocusRequest {
    field: keyof FeedbackFormValues;
}

function FeedbackForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const submissionLock = useRef(false);

    const [values, setValues] =
        useState<FeedbackFormValues>(initialValues);

    const [hasSubmitted, setHasSubmitted] =
        useState<boolean>(false);

    const [status, setStatus] =
        useState<SubmissionStatus>("idle");

    const [submissionError, setSubmissionError] =
        useState<string>("");

    const [focusRequest, setFocusRequest] =
        useState<FocusRequest | null>(null);

    const isPending = status === "pending";

    const errors: FeedbackFormErrors = hasSubmitted
        ? validateFeedback(values)
        : {};

    useEffect(() => {
        if (!focusRequest) {
            return;
        }

        const field = formRef.current?.elements.namedItem(
            focusRequest.field
        );

        if (field instanceof HTMLElement) {
            field.focus();
        }
    }, [focusRequest]);

    function updateField<K extends keyof FeedbackFormValues>(
        field: K,
        value: FeedbackFormValues[K]
    ) {
        if (submissionLock.current) {
            return;
        }

        setValues(previous => ({
            ...previous,
            [field]: value,
        }));

        setStatus("idle");
        setSubmissionError("");
    }

    function getFieldProps(
        field: keyof FeedbackFormValues
    ) {
        const id = `feedback-${field}`;

        const descriptionIds = [
            field === "message"
                ? `${id}-hint`
                : undefined,

            errors[field]
                ? `${id}-error`
                : undefined,
        ]
            .filter(Boolean)
            .join(" ");

        return {
            id,
            name: field,
            required: true,
            disabled: isPending,
            "aria-invalid": Boolean(errors[field]),
            "aria-describedby":
                descriptionIds || undefined,
        };
    }

    function handleNameChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        updateField("name", event.target.value);
    }

    function handleEmailChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        updateField("email", event.target.value);
    }

    function handleCategoryChange(
        event: ChangeEvent<HTMLSelectElement>
    ) {
        const category = event.target.value;

        if (
            category === "" ||
            category === "general" ||
            category === "bug" ||
            category === "feature"
        ) {
            updateField("category", category);
        }
    }

    function handleMessageChange(
        event: ChangeEvent<HTMLTextAreaElement>
    ) {
        updateField("message", event.target.value);
    }

    async function handleSubmit(
        event: SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (submissionLock.current) {
            return;
        }

        setHasSubmitted(true);
        setStatus("idle");
        setSubmissionError("");

        const validationErrors =
            validateFeedback(values);

        const firstInvalidField = fieldOrder.find(
            field => Boolean(validationErrors[field])
        );

        if (firstInvalidField) {
            setFocusRequest({
                field: firstInvalidField,
            });

            return;
        }

        setFocusRequest(null);

        const payload: FeedbackFormValues = {
            name: values.name.trim(),
            email: values.email.trim(),
            category: values.category,
            message: values.message.trim(),
        };

        submissionLock.current = true;
        setStatus("pending");

        try {
            await submitFeedback(payload);

            setValues({ ...initialValues });
            setHasSubmitted(false);
            setStatus("success");
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred.";

            setSubmissionError(message);
            setStatus("failure");
        } finally {
            submissionLock.current = false;
        }
    }

    function resetForm() {
        if (submissionLock.current) {
            return;
        }

        setValues({ ...initialValues });
        setHasSubmitted(false);
        setStatus("idle");
        setSubmissionError("");
        setFocusRequest(null);
    }

    const statusMessage = {
        idle: "Demo mode. No feedback will be sent.",
        pending: "Submitting demo feedback. Please wait...",
        success: "Demo feedback submitted successfully.",
        failure: submissionError,
    }[status];

    return (
        <Card>
            <div className="feedback-panel">
                <h3>Dashboard Feedback</h3>

                <p className="feedback-description">
                    Help us improve your InsightBoard
                    experience.
                </p>

                <form
                    ref={formRef}
                    className="feedback-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <FormField
                        id="feedback-name"
                        label="Full name"
                        required
                        error={errors.name}
                    >
                        <input
                            {...getFieldProps("name")}
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your name"
                            value={values.name}
                            onChange={handleNameChange}
                        />
                    </FormField>

                    <FormField
                        id="feedback-email"
                        label="Email address"
                        required
                        error={errors.email}
                    >
                        <input
                            {...getFieldProps("email")}
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={values.email}
                            onChange={handleEmailChange}
                        />
                    </FormField>

                    <FormField
                        id="feedback-category"
                        label="Feedback category"
                        required
                        error={errors.category}
                    >
                        <select
                            {...getFieldProps("category")}
                            value={values.category}
                            onChange={handleCategoryChange}
                        >
                            <option value="">
                                Select a category
                            </option>

                            <option value="general">
                                General feedback
                            </option>

                            <option value="bug">
                                Bug report
                            </option>

                            <option value="feature">
                                Feature request
                            </option>
                        </select>
                    </FormField>

                    <FormField
                        id="feedback-message"
                        label="Message"
                        required
                        error={errors.message}
                        hint={`${values.message.length} / 500 characters`}
                    >
                        <textarea
                            {...getFieldProps("message")}
                            placeholder="Tell us about your experience..."
                            rows={5}
                            maxLength={500}
                            value={values.message}
                            onChange={handleMessageChange}
                        />
                    </FormField>

                    <div
                        className={`feedback-status feedback-status--${status}`}
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {statusMessage}
                    </div>

                    <div className="feedback-actions">
                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? "Submitting..."
                                : status === "failure"
                                  ? "Retry Submission"
                                  : "Submit Feedback"}
                        </Button>

                        <Button
                            onClick={resetForm}
                            disabled={isPending}
                        >
                            Reset Form
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default FeedbackForm;
