-- CreateTable
CREATE TABLE "USERS_POINTS" (
    "user_points_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "point_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USERS_POINTS_pkey" PRIMARY KEY ("user_points_id")
);

-- AddForeignKey
ALTER TABLE "USERS_POINTS" ADD CONSTRAINT "USERS_POINTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
