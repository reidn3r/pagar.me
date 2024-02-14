-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('debit_card', 'credit_card');

-- CreateEnum
CREATE TYPE "PayableStatus" AS ENUM ('paid', 'waiting_funds');

-- CreateTable
CREATE TABLE "Payable" (
    "id" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_status" "PayableStatus" NOT NULL DEFAULT 'waiting_funds',

    CONSTRAINT "Payable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value_in_cents" INTEGER NOT NULL,
    "description" VARCHAR(64) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL DEFAULT 'debit_card',
    "card_number" VARCHAR(16) NOT NULL,
    "name" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "cvv" VARCHAR(3) NOT NULL,
    "payableId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payableId_fkey" FOREIGN KEY ("payableId") REFERENCES "Payable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
