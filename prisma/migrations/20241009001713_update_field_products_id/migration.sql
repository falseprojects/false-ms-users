/*
  Warnings:

  - You are about to drop the column `product_id` on the `USER_WISHLISTS` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "USER_WISHLISTS" DROP COLUMN "product_id",
ADD COLUMN     "products_ids" INTEGER[];
