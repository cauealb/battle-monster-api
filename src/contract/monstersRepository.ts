import type { Monsters } from "../types/Monster.js"

export interface monsterRepository {
    create(monster: Monsters): Promise<Monsters>

    findById(idMonster: number): Promise<Monsters | null>
    findAll(): Promise<Monsters[]>
}