/*
  Warnings:

  - Added the required column `about` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[];
