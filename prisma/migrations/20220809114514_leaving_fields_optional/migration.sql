-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "body" TEXT NOT NULL,
    "like_cont" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_comment" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "post_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_like" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "post_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "birthdate" VARCHAR(10),
    "city" VARCHAR(120),
    "work" VARCHAR(120),
    "avatar" VARCHAR(120),
    "cover" VARCHAR(120),
    "token" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_relation" (
    "id" SERIAL NOT NULL,
    "user_from" INTEGER NOT NULL,
    "user_to" INTEGER NOT NULL,

    CONSTRAINT "user_relation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comment" ADD CONSTRAINT "post_comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comment" ADD CONSTRAINT "post_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
