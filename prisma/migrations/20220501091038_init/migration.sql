-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "onnwerId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_onnwerId_fkey" FOREIGN KEY ("onnwerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
