-- CreateTable
CREATE TABLE "Creation" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Creation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Creation" ADD CONSTRAINT "Creation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
