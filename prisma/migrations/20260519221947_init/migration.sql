-- CreateTable
CREATE TABLE "SavedContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "niche" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "extraNotes" TEXT,
    "generatedContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
