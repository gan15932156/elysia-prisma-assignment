-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "energyUsedKWh" REAL,
    "pricePerKWh" REAL NOT NULL,
    "totalCost" REAL,
    "chargerId" TEXT NOT NULL,
    CONSTRAINT "Session_chargerId_fkey" FOREIGN KEY ("chargerId") REFERENCES "Charger" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("chargerId", "endTime", "energyUsedKWh", "id", "pricePerKWh", "startTime", "totalCost") SELECT "chargerId", "endTime", "energyUsedKWh", "id", "pricePerKWh", "startTime", "totalCost" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
