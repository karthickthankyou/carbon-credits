/*
  Warnings:

  - The primary key for the `Verifier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Verifier` table. All the data in the column will be lost.
  - Added the required column `active` to the `Verifier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Verifier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Verifier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Verifier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToVerifier" DROP CONSTRAINT "_ProjectToVerifier_B_fkey";

-- AlterTable
ALTER TABLE "Verifier" DROP CONSTRAINT "Verifier_pkey",
DROP COLUMN "address",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD CONSTRAINT "Verifier_pkey" PRIMARY KEY ("walletAddress");

-- AddForeignKey
ALTER TABLE "_ProjectToVerifier" ADD CONSTRAINT "_ProjectToVerifier_B_fkey" FOREIGN KEY ("B") REFERENCES "Verifier"("walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;
