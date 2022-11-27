/*
  Warnings:

  - The primary key for the `user_hobbies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_hobbies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_hobbies` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`, `hobbyId`);
