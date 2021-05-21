-- AlterTable
ALTER TABLE `Shift` ADD COLUMN `location` VARCHAR(191),
    MODIFY `start` VARCHAR(191) NOT NULL;
