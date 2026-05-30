/*
  Warnings:

  - The `action` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductAction" AS ENUM ('Publish', 'Draft');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "action",
ADD COLUMN     "action" "ProductAction" NOT NULL DEFAULT 'Publish';
