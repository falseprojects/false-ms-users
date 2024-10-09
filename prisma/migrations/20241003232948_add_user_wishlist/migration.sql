-- CreateTable
CREATE TABLE "USER_WISHLISTS" (
    "user_wishlist_id" SERIAL NOT NULL,
    "wishlist_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USER_WISHLISTS_pkey" PRIMARY KEY ("user_wishlist_id")
);

-- AddForeignKey
ALTER TABLE "USER_WISHLISTS" ADD CONSTRAINT "USER_WISHLISTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
