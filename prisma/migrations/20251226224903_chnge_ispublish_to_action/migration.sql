/*
  Warnings:

  - You are about to drop the column `isPublish` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isPublish",
ADD COLUMN     "action" TEXT;
