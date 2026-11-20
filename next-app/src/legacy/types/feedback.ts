
export type FeedbackCategory =
    | ""
    | "general"
    | "bug"
    | "feature";

export interface FeedbackFormValues {
    name: string;
    email: string;
    category: FeedbackCategory;
    message: string;
}

export type FeedbackFormErrors = Partial<
    Record<keyof FeedbackFormValues, string>
>;
