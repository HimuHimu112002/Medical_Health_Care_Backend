/*
  Warnings:

  - The values [id] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Doctorspecialits` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'DOCTOR', 'PATIENT');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Doctorspecialits" DROP CONSTRAINT "Doctorspecialits_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Doctorspecialits" DROP CONSTRAINT "Doctorspecialits_speficalitiesId_fkey";

-- DropTable
DROP TABLE "Doctorspecialits";

-- CreateTable
CREATE TABLE "doctorspecialits" (
    "speficalitiesId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctorspecialits_pkey" PRIMARY KEY ("speficalitiesId","doctorId")
);

-- AddForeignKey
ALTER TABLE "doctorspecialits" ADD CONSTRAINT "doctorspecialits_speficalitiesId_fkey" FOREIGN KEY ("speficalitiesId") REFERENCES "specialits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctorspecialits" ADD CONSTRAINT "doctorspecialits_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
