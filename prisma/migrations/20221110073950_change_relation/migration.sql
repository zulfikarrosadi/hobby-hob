/*
  Warnings:

  - You are about to drop the column `userHobbyId` on the `hobbies` table. All the data in the column will be lost.
  - You are about to drop the column `userHobbyId` on the `user_profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `hobbies` DROP FOREIGN KEY `hobbies_userHobbyId_fkey`;

-- DropForeignKey
ALTER TABLE `user_profile` DROP FOREIGN KEY `user_profile_userHobbyId_fkey`;

-- AlterTable
ALTER TABLE `hobbies` DROP COLUMN `userHobbyId`;

-- AlterTable
ALTER TABLE `user_profile` DROP COLUMN `userHobbyId`;

-- AddForeignKey
ALTER TABLE `user_hobbies` ADD CONSTRAINT `user_hobbies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_hobbies` ADD CONSTRAINT `user_hobbies_hobbyId_fkey` FOREIGN KEY (`hobbyId`) REFERENCES `hobbies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
