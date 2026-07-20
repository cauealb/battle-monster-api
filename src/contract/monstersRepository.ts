import type { Monster } from "../module/Monsters/types/Monster.ts"
import type { MonsterCreate } from "../module/Monsters/types/MonsterCreate.ts"

export interface monsterRepository {
    create(monster: MonsterCreate): Promise<Monster>

    findById(idMonster: number): Promise<Monster | null>
    findAll(): Promise<Monster[]>
}