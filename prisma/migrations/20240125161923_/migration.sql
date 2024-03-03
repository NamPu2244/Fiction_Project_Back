-- AlterTable
ALTER TABLE `espisodes` MODIFY `status` ENUM('public', 'hidden') NOT NULL DEFAULT 'hidden';
