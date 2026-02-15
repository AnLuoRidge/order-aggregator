import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Order, OrdersJson } from "../../types.ts";
import type { CsvExportFilePaths } from "./types.ts";


const JSON_EXT = ".json";

function getJsonInputFilePath(): string {
    const inputFilePath: string | undefined = process.argv[2];

    if (!inputFilePath) {
        throw new Error("Please provide the JSON file path.");
    }

    const rawFileExt = path.extname(inputFilePath);
    if (rawFileExt !== JSON_EXT) {
        throw new Error(`Please provide a file with extension .json, not ${rawFileExt}`)
    }

    return path.resolve(inputFilePath);
}

async function getOrdersFromFilePath(filePath: string): Promise<Order[]> {
    const ordersJson: string = await readFile(filePath, {
        encoding: "utf-8",
    });
    let parsedJson: OrdersJson = JSON.parse(ordersJson);
    return parsedJson.orders;
}

function getExportCsvFilePaths(inputFilePath: string, exportFolderName: string): CsvExportFilePaths {
    const inputFileExt = path.extname(inputFilePath);
    const inputFileName: string = path.basename(inputFilePath, inputFileExt);
    const csvFileNameTotalFilledQtyByTicker = `${inputFileName}_sum.csv`;
    const csvFilenameLargestFilledQtyByTicker = `${inputFileName}_largest.csv`;
    const csvFilePathTotalFilledQtyByTicker = `./${exportFolderName}/${csvFileNameTotalFilledQtyByTicker}`;
    const csvFilePathLargestFilledQtyByTicker = `./${exportFolderName}/${csvFilenameLargestFilledQtyByTicker}`;

    return {
        csvFilePathTotalFilledQtyByTicker,
        csvFilePathLargestFilledQtyByTicker
    }
}

export {
    getJsonInputFilePath,
    getOrdersFromFilePath,
    getExportCsvFilePaths
}