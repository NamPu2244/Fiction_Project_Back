/*
  Warnings:

  - Added the required column `coin` to the `userDonates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userdonates` ADD COLUMN `coin` INTEGER NOT NULL;
