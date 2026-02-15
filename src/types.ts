export type OrderAggregatorSourceType = "jsonFile" | "api";
export type OrderAggregatorExportType = "csv" | "api";

export type Order = {
    eventTime: string; // "YYYYMMDD-HH:mm:ss:SSS"
    clientOrderId: string;
    ticker: string;
    quantity: number;
    filledQuantity: number;
};

export type OrderById = Map<string, Order>;

export type OrdersJson = {
    orders: Order[];
};

export type TotalFilledQtyByTicker = Map<string, number>;
export type LargestFilledQtyByTicker = Map<string, number>;
