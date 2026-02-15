import type { Order, OrderById } from "../types.ts";

function normaliseOrders(orders: Order[]): OrderById {
    const normalisedOrdersById: OrderById = new Map();
    orders.forEach((currentOrder) => {
        const conflictOrder: Order | undefined = normalisedOrdersById.get(
            currentOrder.clientOrderId,
        );

        // If multiple orders share the same order id, only the latest order is kept.
        if (conflictOrder) {
            const latestOrder =
                currentOrder.eventTime > conflictOrder.eventTime
                    ? currentOrder
                    : conflictOrder;
            normalisedOrdersById.set(currentOrder.clientOrderId, latestOrder);
        } else if (currentOrder.filledQuantity > 0) {
            normalisedOrdersById.set(currentOrder.clientOrderId, currentOrder);
        }
    });
    return normalisedOrdersById;
}

export { normaliseOrders };
