-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('MEMBER', 'CREATOR', 'ADMIN') NOT NULL DEFAULT 'MEMBER';