/*
  Warnings:

  - You are about to drop the `relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "relation" DROP CONSTRAINT "relation_user_Id_fkey";

-- DropForeignKey
ALTER TABLE "relation" DROP CONSTRAINT "relation_user_relation_Id_fkey";

-- DropTable
DROP TABLE "relation";

-- AddForeignKey
ALTER TABLE "user_relation" ADD CONSTRAINT "user_relation_user_from_fkey" FOREIGN KEY ("user_from") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
