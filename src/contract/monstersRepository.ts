import { Monsters } from "../types/Monster"

export interface monsterRepository {
    create(monster: Monsters): Promise<Monsters>

    findById(idMonster: number): Promise<Monsters | null>
    findAll(): Promise<Monsters[]>
}