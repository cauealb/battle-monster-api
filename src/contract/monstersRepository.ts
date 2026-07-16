import { Monsters } from "../types/Monster"

export interface monsterRepository {
    create(monster: Monsters): Promise<Monsters>

    findByName(nameMonster: string): Promise<Monsters | null>
    findAll(): Promise<Monsters[]>
}