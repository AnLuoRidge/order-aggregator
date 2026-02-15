import type {
    OrderAggregatorExportType,
    OrderAggregatorSourceType,
} from "./types.ts";

import { aggregateOrdersFromJsonFile } from "./orderProcessing/aggregateOrders/aggregateOrdersFromJsonFile/aggregateOrdersFromJsonFile.ts";

async function aggregateOrders(
    sourceType: OrderAggregatorSourceType,
    exportType: OrderAggregatorExportType,
) {
    if (sourceType === "jsonFile") {
        aggregateOrdersFromJsonFile(exportType);
    } else {
        console.error('The source type is not supported.');
    }
}

try {
    await aggregateOrders("jsonFile", "csv");
} catch (err) {
    process.stderr.write(String(err));
    process.exitCode = 1;
}

export { aggregateOrders };
