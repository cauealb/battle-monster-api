import type { Monster } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";
import type { monsterRepository } from "../contract/monstersRepository.ts";

export class PrismaMonsterRepository implements monsterRepository {
    async create(monster: Monster) {
        return await prisma.monster.create({
            data: monster
        })
    }

    async findAll() {
        return await prisma.monster.findMany()
    }

    async findById(idMonster: number) {
        return await prisma.monster.findUnique( { where: { idMonster: idMonster } } )
    }
}