-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('paragraph', 'heading', 'subheading', 'image', 'video', 'link', 'quote');

-- CreateTable
CREATE TABLE "ShowcaseBlock" (
    "id" TEXT NOT NULL,
    "showcaseId" TEXT NOT NULL,
    "type" "BlockType" NOT NULL,
    "content" TEXT,
    "mediaUrl" TEXT,
    "caption" TEXT,
    "order" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShowcaseBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ShowcaseBlock_showcaseId_idx" ON "ShowcaseBlock"("showcaseId");

-- AddForeignKey
ALTER TABLE "ShowcaseBlock" ADD CONSTRAINT "ShowcaseBlock_showcaseId_fkey" FOREIGN KEY ("showcaseId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
