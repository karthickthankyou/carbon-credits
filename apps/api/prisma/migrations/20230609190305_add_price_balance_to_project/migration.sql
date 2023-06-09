/*
  Warnings:

  - Added the required column `balance` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "balance" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
