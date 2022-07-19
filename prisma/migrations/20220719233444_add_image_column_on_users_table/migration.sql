/*
  Warnings:

  - You are about to drop the column `user_id` on the `images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_user_id_fkey";

-- DropIndex
DROP INDEX "images_user_id_key";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "image_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_image_id_key" ON "users"("image_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
