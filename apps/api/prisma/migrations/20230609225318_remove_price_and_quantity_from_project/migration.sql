/*
  Warnings:

  - You are about to drop the column `balance` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "balance",
DROP COLUMN "price";
