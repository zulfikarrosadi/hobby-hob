/*
  Warnings:

  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_userId_fkey`;

-- DropTable
DROP TABLE `posts`;

-- CreateTable
CREATE TABLE `user_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `bio` TEXT NULL,
    `userHobbyId` INTEGER NULL,

    UNIQUE INDEX `user_profile_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hobbies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userHobbyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_hobbies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `hobbyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_profile` ADD CONSTRAINT `user_profile_userHobbyId_fkey` FOREIGN KEY (`userHobbyId`) REFERENCES `user_hobbies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hobbies` ADD CONSTRAINT `hobbies_userHobbyId_fkey` FOREIGN KEY (`userHobbyId`) REFERENCES `user_hobbies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
