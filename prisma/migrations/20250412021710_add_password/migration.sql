/*
  Warnings:

  - You are about to drop the column `is_provider_anonymous` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider_account_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider_aud` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider_identity_id` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `password` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "is_provider_anonymous",
DROP COLUMN "provider",
DROP COLUMN "provider_account_id",
DROP COLUMN "provider_aud",
DROP COLUMN "provider_identity_id",
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "token_version" INTEGER NOT NULL DEFAULT 0;
