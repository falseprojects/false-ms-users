/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `USERS_POINTS` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `USER_PROFILES` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "USERS_POINTS_user_points_id_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "USERS_POINTS_user_id_key" ON "USERS_POINTS"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "USER_PROFILES_user_id_key" ON "USER_PROFILES"("user_id");

-- AddForeignKey
ALTER TABLE "USERS_POINTS" ADD CONSTRAINT "USERS_POINTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
