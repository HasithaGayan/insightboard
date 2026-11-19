
import { describe, it, expect } from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import FeedbackForm from "./FeedbackForm";

describe("FeedbackForm", () => {
    it("displays the accessible form fields", () => {
        render(<FeedbackForm />);

        expect(
            screen.getByLabelText(/full name/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/email address/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/feedback category/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/^message/i)
        ).toBeInTheDocument();
    });

    it("shows validation errors for empty fields", async () => {
        const user = userEvent.setup();

        render(<FeedbackForm />);

        await user.click(
            screen.getByRole("button", {
                name: /submit feedback/i,
            })
        );

        expect(
            screen.getByText("Please enter your name.")
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Please enter your email address."
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Please select a feedback category."
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Please enter your message."
            )
        ).toBeInTheDocument();
    });

    it("focuses the first invalid field", async () => {
        const user = userEvent.setup();

        render(<FeedbackForm />);

        await user.click(
            screen.getByRole("button", {
                name: /submit feedback/i,
            })
        );

        const nameInput =
            screen.getByLabelText(/full name/i);

        expect(nameInput).toHaveFocus();

        expect(nameInput).toHaveAttribute(
            "aria-invalid",
            "true"
        );

        expect(nameInput).toHaveAccessibleDescription(
            "Please enter your name."
        );
    });

    it("updates the message character counter", async () => {
        const user = userEvent.setup();

        render(<FeedbackForm />);

        const messageInput =
            screen.getByLabelText(/^message/i);

        await user.type(messageInput, "Hello");

        expect(messageInput).toHaveValue("Hello");

        expect(
            screen.getByText("5 / 500 characters")
        ).toBeInTheDocument();
    });

    it("clears entered values when reset is clicked", async () => {
        const user = userEvent.setup();

        render(<FeedbackForm />);

        const nameInput =
            screen.getByLabelText(/full name/i);

        await user.type(nameInput, "Test User");

        expect(nameInput).toHaveValue("Test User");

        await user.click(
            screen.getByRole("button", {
                name: /reset form/i,
            })
        );

        expect(nameInput).toHaveValue("");
    });
});
