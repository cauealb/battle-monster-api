import { Monsters } from "../types/Monster"

export interface monsterRepository {
    create(monster: Monsters): Promise<Monsters>
    findAll(): Promise<Monsters[]>
}