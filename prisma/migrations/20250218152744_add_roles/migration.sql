-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'RENTER';
