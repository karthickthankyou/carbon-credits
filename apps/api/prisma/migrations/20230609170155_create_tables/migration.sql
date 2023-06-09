-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verifier" (
    "address" TEXT NOT NULL,

    CONSTRAINT "Verifier_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retirement" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,
    "retiree" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Retirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "forSale" BOOLEAN NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToVerifier" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_user_projectId_key" ON "Inventory"("user", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToVerifier_AB_unique" ON "_ProjectToVerifier"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToVerifier_B_index" ON "_ProjectToVerifier"("B");

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retirement" ADD CONSTRAINT "Retirement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToVerifier" ADD CONSTRAINT "_ProjectToVerifier_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToVerifier" ADD CONSTRAINT "_ProjectToVerifier_B_fkey" FOREIGN KEY ("B") REFERENCES "Verifier"("address") ON DELETE CASCADE ON UPDATE CASCADE;
