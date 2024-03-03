/*
  Warnings:

  - You are about to drop the column `userName` on the `user` table. All the data in the column will be lost.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `userName`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `works` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `tagline` TEXT NOT NULL,
    `type` ENUM('FICTION', 'CARTOON') NOT NULL,
    `category` ENUM('Love', 'Comedy', 'Horror', 'Secret') NOT NULL,
    `intro` TEXT NOT NULL,
    `status` ENUM('public', 'hidden') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
