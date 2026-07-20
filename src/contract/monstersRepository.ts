import type { Monster } from "../../generated/prisma/browser.ts"
import type { Monsters } from "../types/Monster.js"

export interface monsterRepository {
    create(monster: Monster): Promise<Monster>

    findById(idMonster: number): Promise<Monster | null>
    findAll(): Promise<Monster[]>
}