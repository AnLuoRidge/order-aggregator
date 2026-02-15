import test from "node:test";
import assert from "node:assert/strict";

import type { Order, OrderById, TotalFilledQtyByTicker } from "../../types.ts";

import singleTickerOrders from "./testOrders/singleTicker.json" with { type: "json" };
import singerTickerExpectedResult from "./expectedResults/singleTicker.json" with { type: "json" };
import multipleTickerOrders from "./testOrders/multipleTicker.json" with { type: "json" };
import multipleTickerExpectedResult from "./expectedResults/multipleTicker.json" with { type: "json" };
import { aggregateFilledQuantityByTicker } from "../aggregateFilledQuantityByTicker.ts";
import { normaliseOrders } from "../../normaliseOrders/normaliseOrders.ts";

test("aggregateFilledQuantityByTicker()", async (t) => {
    await t.test(
        "does nothing if there's no order",
        async () => {
            const totalFilledQtyByTicker: TotalFilledQtyByTicker = aggregateFilledQuantityByTicker(new Map());
            const result = Object.fromEntries(
                totalFilledQtyByTicker,
            );

            assert.deepStrictEqual(result, {});
        },
    );

    await t.test(
        "does transform only when there's only one order",
        async () => {
            const mockOrder: Order = {
                clientOrderId: "only-one",
                eventTime: "20251112-01:24:23:101",
                ticker: "X Equity",
                quantity: 100,
                filledQuantity: 50,
            };
            const mockOrdersById: OrderById = new Map([
                [mockOrder.clientOrderId, mockOrder]
            ]);
            const totalFilledQtyByTicker: TotalFilledQtyByTicker = aggregateFilledQuantityByTicker(mockOrdersById);
            const result = Object.fromEntries(
                totalFilledQtyByTicker,
            );
            const expectedResult = { [mockOrder.ticker]: mockOrder.filledQuantity }

            assert.deepStrictEqual(result, expectedResult);
        },
    );

    await t.test(
        "aggregates filled quantity in single-ticker orders",
        async () => {
            const orderById: OrderById = new Map(Object.entries(singleTickerOrders));
            const totalFilledQtyByTicker: TotalFilledQtyByTicker = aggregateFilledQuantityByTicker(orderById);
            const result = Object.fromEntries(
                totalFilledQtyByTicker,
            );

            assert.deepStrictEqual(result, singerTickerExpectedResult);
        },
    );

    await t.test(
        "aggregates filled quantity in multi-ticker orders",
        async () => {
            // If we replace the testing data with normalised order data, we can remove the dependency of normaliseOrders here.
            const orderById: OrderById = normaliseOrders(multipleTickerOrders);
            const totalFilledQtyByTicker: TotalFilledQtyByTicker = aggregateFilledQuantityByTicker(orderById);
            const result = Object.fromEntries(
                totalFilledQtyByTicker,
            );

            assert.deepStrictEqual(result, multipleTickerExpectedResult);
        },
    );
});
