/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user_profile` MODIFY `fullName` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_profile_userId_key` ON `user_profile`(`userId`);
