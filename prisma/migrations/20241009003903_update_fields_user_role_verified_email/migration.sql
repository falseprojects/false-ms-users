/*
  Warnings:

  - A unique constraint covering the columns `[user_points_id,user_id]` on the table `USERS_POINTS` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "USERS_POINTS" DROP CONSTRAINT "USERS_POINTS_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'guest',
ADD COLUMN     "verified_email" TEXT NOT NULL DEFAULT 'F';

-- CreateIndex
CREATE UNIQUE INDEX "USERS_POINTS_user_points_id_user_id_key" ON "USERS_POINTS"("user_points_id", "user_id");
