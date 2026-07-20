-- CreateTable
CREATE TABLE "Monster" (
    "idMonster" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "maxHp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("idMonster")
);
