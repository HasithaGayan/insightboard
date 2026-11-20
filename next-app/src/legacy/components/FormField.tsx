
import type { ReactNode } from "react";

interface FormFieldProps {
    id: string;
    label: string;
    required?: boolean;
    error?: string;
    hint?: string;
    children: ReactNode;
}

function FormField({
    id,
    label,
    required = false,
    error,
    hint,
    children,
}: FormFieldProps) {
    return (
        <div className="feedback-field">
            <label htmlFor={id}>
                {label}
                {required && " *"}
            </label>

            {children}

            {hint && (
                <small id={`${id}-hint`}>
                    {hint}
                </small>
            )}

            {error && (
                <span
                    className="field-error"
                    id={`${id}-error`}
                >
                    {error}
                </span>
            )}
        </div>
    );
}

export default FormField;
