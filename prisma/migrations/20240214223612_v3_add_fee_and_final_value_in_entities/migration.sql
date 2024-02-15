/*
  Warnings:

  - Added the required column `final_payable_in_cents` to the `Payable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee_in_percentage` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transaction_card_number_cvv_expireAt_name_key";

-- AlterTable
ALTER TABLE "Payable" ADD COLUMN     "final_payable_in_cents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fee_in_percentage" INTEGER NOT NULL;
