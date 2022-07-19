-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_image_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
