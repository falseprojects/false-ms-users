-- CreateTable
CREATE TABLE "USER_PROFILES" (
    "user_profile_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "contact_preference" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USER_PROFILES_pkey" PRIMARY KEY ("user_profile_id")
);

-- AddForeignKey
ALTER TABLE "USER_PROFILES" ADD CONSTRAINT "USER_PROFILES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
