import type { Monster } from "../../generated/prisma/browser.ts"
import type { MonsterCreateInput } from "../../generated/prisma/models.ts"

export interface monsterRepository {
    create(monster: MonsterCreateInput): Promise<Monster>

    findById(idMonster: number): Promise<Monster | null>
    findAll(): Promise<Monster[]>
}