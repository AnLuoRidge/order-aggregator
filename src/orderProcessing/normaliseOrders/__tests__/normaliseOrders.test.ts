import test from "node:test";
import assert from "node:assert/strict";

import type { Order, OrderById } from "../../../types.ts";

import { normaliseOrders } from "../normaliseOrders.ts";

test("normaliseOrders()", async (t) => {
    await t.test("removes duplicate orders", () => {
        const mockOrders: Order[] = [
            {
                clientOrderId: "aaa",
                eventTime: "20251112-01:24:23:101",
                ticker: "BHP AU Equity",
                quantity: 100,
                filledQuantity: 50,
            },
            {
                clientOrderId: "aaa",
                eventTime: "20251112-01:25:23:101",
                ticker: "BHP AU Equity",
                quantity: 100,
                filledQuantity: 50,
            },
        ];

        const expectedResult: OrderById = new Map([
            [
                "aaa",
                {
                    clientOrderId: "aaa",
                    eventTime: "20251112-01:25:23:101",
                    ticker: "BHP AU Equity",
                    quantity: 100,
                    filledQuantity: 50,
                },
            ],
        ]);
        const result: OrderById = normaliseOrders(mockOrders);

        assert.deepStrictEqual(result, expectedResult);
    });

    await t.test("removes orders with 0 filled quantity", () => {
        const mockOrders: Order[] = [
            {
                clientOrderId: "aaa",
                eventTime: "20251112-01:25:23:101",
                ticker: "BHP AU Equity",
                quantity: 100,
                filledQuantity: 50,
            },
            {
                clientOrderId: "ccc",
                eventTime: "20251113-01:25:23:101",
                ticker: "JP Equity",
                quantity: 100,
                filledQuantity: 0,
            },
        ];
        const expectedResult: OrderById = new Map([
            [
                "aaa",
                {
                    clientOrderId: "aaa",
                    eventTime: "20251112-01:25:23:101",
                    ticker: "BHP AU Equity",
                    quantity: 100,
                    filledQuantity: 50,
                },
            ],
        ]);
        const result: OrderById = normaliseOrders(mockOrders);
        assert.deepStrictEqual(result, expectedResult);
    });
});
