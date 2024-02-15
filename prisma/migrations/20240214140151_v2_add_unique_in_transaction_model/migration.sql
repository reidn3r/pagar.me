/*
  Warnings:

  - You are about to alter the column `name` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - A unique constraint covering the columns `[card_number,cvv,expireAt,name]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "name" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "expireAt" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_card_number_cvv_expireAt_name_key" ON "Transaction"("card_number", "cvv", "expireAt", "name");
