-- CreateTable
CREATE TABLE "relation" (
    "user_Id" INTEGER NOT NULL,
    "user_relation_Id" INTEGER NOT NULL,

    CONSTRAINT "relation_pkey" PRIMARY KEY ("user_Id","user_relation_Id")
);

-- AddForeignKey
ALTER TABLE "relation" ADD CONSTRAINT "relation_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relation" ADD CONSTRAINT "relation_user_relation_Id_fkey" FOREIGN KEY ("user_relation_Id") REFERENCES "user_relation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
