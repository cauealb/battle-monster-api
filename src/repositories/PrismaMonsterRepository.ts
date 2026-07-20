import { prisma } from "../../lib/prisma.ts";
import type { monsterRepository } from "../contract/monstersRepository.ts";
import type { MonsterCreate } from "../module/Monsters/types/MonsterCreate.ts";

export class PrismaMonsterRepository implements monsterRepository {
    async create(monster: MonsterCreate) {
        return await prisma.monster.create({
            data: monster
        })
    }

    async findById(idMonster: number) {
        return await prisma.monster.findUnique( { where: { idMonster: idMonster } } )
    }

    async findAll() {
        return await prisma.monster.findMany()
    }
}