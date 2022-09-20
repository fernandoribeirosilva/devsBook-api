/*
  Warnings:

  - Made the column `avatar` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cover` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT 'default.jpg',
ALTER COLUMN "cover" SET NOT NULL,
ALTER COLUMN "cover" SET DEFAULT 'cover.jpg';
