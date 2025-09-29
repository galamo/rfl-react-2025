type User = {
    userName: string,
    password: string,
    location: string,
}

type OneOFKeys = keyof User;
const key1: OneOFKeys = "location"

type ScanResult = {
    numberOfVulnerabilities: number;
    packages: Array<{ name: string; version: string; cve: string }>;
    priorities: Array<string>;
    id: string;
    userScannerId: string;
};

const scanErrors: Array<ScanResult> = [
    {
        numberOfVulnerabilities: 1,
        packages: [{ name: "fetch", version: "1.2.3", cve: "2024-1554-223" }],
        priorities: ["high", "low"],
        id: "id_1",
        userScannerId: "2024_12_12",
    },
    {
        numberOfVulnerabilities: 1,
        packages: [{ name: "axios", version: "1.2.3", cve: "2024-1124-223" }],
        priorities: ["high", "low"],
        id: "id_2",
        userScannerId: "2024_12_12",
    },
];

function getScanResultStats<K extends keyof ScanResult>(
    scan: ScanResult | undefined,
    key: K
): ScanResult[K] | undefined {
    return scan?.[key]
}

getScanResultStats(scanErrors[0], "id")

function filterScans<K extends keyof ScanResult>(
    scans: ScanResult[],
    key: K,
    value: ScanResult[K]
): ScanResult[] | undefined {
    // always do input validation for runtime 
    return scans.filter(item => item[key] === value)
}

filterScans(scanErrors, "userScannerId", "aa")
filterScans(scanErrors, "numberOfVulnerabilities", 1)

type ScanResultKey = keyof Omit<ScanResult, "priorities" | "packages">

function searchScan(
    data: Array<ScanResult>,
    key: ScanResultKey,
    value: string | number
): Array<ScanResult> | undefined {
    if (!Array.isArray(data)) return;
    return data.filter(item => {
        if (typeof value === "string") {
            return (item[key] as string).toLowerCase() === value.toLowerCase()
        } else {
            return item[key] === value
        }
    })
}

searchScan(scanErrors, "id", 1)


