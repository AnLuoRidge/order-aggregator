
import type {
    OrderAggregatorExportType,
    OrderById,
    TotalFilledQtyByTicker,
    LargestFilledQtyByTicker,
} from "../../../types.ts";

import { exportMapToCsv } from "../../../utils/exportCsv/exportMapToCsv.ts";
import { aggregateFilledQuantityByTicker } from "../../aggregateFilledQuantityByTicker/aggregateFilledQuantityByTicker.ts";
import { getLargestFilledQtyByTicker } from "../../getLargestFilledQtyByTicker/getLargestFilledQtyByTicker.ts";
import { normaliseOrders } from "../../normaliseOrders/normaliseOrders.ts";
import { getJsonInputFilePath, getOrdersFromFilePath, getExportCsvFilePaths } from "./pathHelpers.ts";

const EXPORT_FOLDER_NAME = "processed_orders";

async function aggregateOrdersFromJsonFile(
    exportType: OrderAggregatorExportType,
) {
    // Read orders from the json file
    const inputFilePath: string = getJsonInputFilePath();
    const orders = await getOrdersFromFilePath(inputFilePath);
    // Aggregate orders
    const orderById: OrderById = normaliseOrders(orders);
    const aggregatedFilledQtyByTicker: TotalFilledQtyByTicker =
        aggregateFilledQuantityByTicker(orderById);
    const largestFilledQtyByTicker: LargestFilledQtyByTicker =
        getLargestFilledQtyByTicker(orderById);
    // Export results
    const {
        csvFilePathTotalFilledQtyByTicker,
        csvFilePathLargestFilledQtyByTicker
    } = getExportCsvFilePaths(inputFilePath, EXPORT_FOLDER_NAME);

    if (exportType === "csv") {
        await exportMapToCsv(
            aggregatedFilledQtyByTicker,
            csvFilePathTotalFilledQtyByTicker,
        );
        await exportMapToCsv(
            largestFilledQtyByTicker,
            csvFilePathLargestFilledQtyByTicker,
        );
        console.log(`Orders aggregated.\nPlease check\n- "${csvFilePathTotalFilledQtyByTicker}"\n- "${csvFilePathTotalFilledQtyByTicker}"`);
    } else {
        console.error('The export type is not supported.');
    }
}

export { aggregateOrdersFromJsonFile };
