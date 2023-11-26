-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `Card_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
