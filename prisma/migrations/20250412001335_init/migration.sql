-- CreateEnum
CREATE TYPE "event_type" AS ENUM ('ACTIVATED_ACCOUNT', 'CHANGED_EMAIL', 'CHANGED_NAME', 'CHANGED_PASSWORD', 'CHANGED_PROVIDER', 'CREATED_ACCOUNT', 'DEACTIVATED_ACCOUNT', 'DISABLED_IS_ADMIN', 'DONE_ONBOARDING', 'EMAIL_VERIFIED', 'ENABLED_IS_ADMIN', 'ERROR', 'FORGOT_PASSWORD', 'GRANT_PERMISSION', 'GRANT_ROLE', 'LOG', 'LOGIN', 'LOGIN_FAILED', 'LOGOUT', 'RESET_PASSWORD', 'REVOKE_PERMISSION', 'REVOKE_ROLE', 'SENT_EMAIL', 'SENT_WHATSAPP_MESSAGE', 'SETTED_ANONYMOUS', 'STARTED_ONBOARDING', 'TOKEN_EXPIRED', 'UNSETTED_ANONYMOUS', 'UPDATED_FIELD', 'WARNING');

-- CreateTable
CREATE TABLE "account_events" (
    "id" SERIAL NOT NULL,
    "account_id" UUID NOT NULL,
    "type" "event_type" NOT NULL DEFAULT 'LOG',
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_moderator" BOOLEAN NOT NULL DEFAULT false,
    "is_provider_anonymous" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "lead_origin" VARCHAR(255),
    "photo_url" TEXT,
    "birth_date" TIMESTAMPTZ(6),
    "provider" VARCHAR(255),
    "provider_aud" VARCHAR(255),
    "provider_account_id" VARCHAR(255),
    "provider_identity_id" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" UUID NOT NULL,
    "excerpt" TEXT,
    "cover_image" TEXT,
    "published_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "read_time" INTEGER DEFAULT 5,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "post_id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "account_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE INDEX "accounts_email_idx" ON "accounts"("email");

-- CreateIndex
CREATE INDEX "accounts_name_idx" ON "accounts"("name");

-- CreateIndex
CREATE INDEX "posts_author_id_idx" ON "posts"("author_id");

-- CreateIndex
CREATE INDEX "posts_title_idx" ON "posts"("title");

-- CreateIndex
CREATE INDEX "posts_content_idx" ON "posts"("content");

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "comments"("post_id");

-- AddForeignKey
ALTER TABLE "account_events" ADD CONSTRAINT "account_events_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
