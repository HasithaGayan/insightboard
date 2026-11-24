export interface SalesRecord {
    orderId: string;
    date: string;
    category: string;
    revenueCents: number;
}
export interface SalesFilters {
    startDate?: string;
    endDate?: string;
    category?: string;
}
export interface SalesSummary {
    orderCount: number;
    revenueCents: number;
    averageOrderCents: number;
    monthly: { month: string; revenueCents: number }[];
    categories: { category: string; revenueCents: number }[];
}
export function parseSalesCsv(text: string): SalesRecord[];
export function summarizeSales(records: readonly SalesRecord[], filters?: SalesFilters): SalesSummary;
