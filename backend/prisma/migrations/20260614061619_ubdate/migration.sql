/*
  Warnings:

  - You are about to drop the column `father_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `grandfather_name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "father_name",
DROP COLUMN "first_name",
DROP COLUMN "grandfather_name",
ADD COLUMN     "name" TEXT NOT NULL;
