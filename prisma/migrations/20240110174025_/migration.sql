-- AlterTable
ALTER TABLE `works` MODIFY `status` ENUM('public', 'hidden') NOT NULL DEFAULT 'hidden';
