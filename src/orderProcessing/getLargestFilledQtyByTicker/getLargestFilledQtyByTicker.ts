import type { LargestFilledQtyByTicker, OrderById } from "../types.ts";

function getLargestFilledQtyByTicker(
    orderById: OrderById,
): LargestFilledQtyByTicker {
    const largestFilledQtyByTicker: LargestFilledQtyByTicker = new Map();

    for (const [, currentOrder] of orderById) {
        const prevLargestFilledQty: number =
            largestFilledQtyByTicker.get(currentOrder.ticker) ?? 0;
        const largestFilledQty = Math.max(
            prevLargestFilledQty,
            currentOrder.filledQuantity,
        );
        // Update largestFilledQtyByTicker only when a larger qty has been found
        if (prevLargestFilledQty !== largestFilledQty) {
            largestFilledQtyByTicker.set(currentOrder.ticker, largestFilledQty);
        }
    }

    return largestFilledQtyByTicker;
}

export { getLargestFilledQtyByTicker };
