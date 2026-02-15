import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

async function exportMapToCsv<K, V>(
    map: Map<K, V>,
    filePath: string,
): Promise<void> {
    let csvData = ``; // Can add header if needed
    map.forEach((value, key) => {
        csvData += `${key},${value}\n`;
    });

    try {
        await mkdir(dirname(filePath), { recursive: true });
        // Currently it always overwrites if a file of the same name presents
        await writeFile(filePath, csvData, "utf-8");
    } catch (error) {
        console.error(error);
    }
}

export { exportMapToCsv };
