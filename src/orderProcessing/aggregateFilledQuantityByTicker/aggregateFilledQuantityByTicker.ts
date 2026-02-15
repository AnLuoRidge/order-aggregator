import type { OrderById, TotalFilledQtyByTicker } from "../types.ts";

function aggregateFilledQuantityByTicker(
    orderById: OrderById,
): TotalFilledQtyByTicker {
    const totalFilledQtyByTicker: TotalFilledQtyByTicker = new Map();

    for (const [, currentOrder] of orderById) {
        let filledQuantitySum: number =
            totalFilledQtyByTicker.get(currentOrder.ticker) ?? 0;
        filledQuantitySum = filledQuantitySum + currentOrder.filledQuantity;
        totalFilledQtyByTicker.set(
            currentOrder.ticker,
            filledQuantitySum,
        );
    }

    return totalFilledQtyByTicker;
}

export { aggregateFilledQuantityByTicker };
