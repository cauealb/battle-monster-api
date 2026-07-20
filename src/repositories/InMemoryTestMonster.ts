import type { Monster } from '../module/Monsters/types/Monster.ts'
import type { monsterRepository } from "../contract/monstersRepository.js";
import type { MonsterCreate } from '../module/Monsters/types/MonsterCreate.ts';

export class InMemoryTestMonsters implements monsterRepository {
    private items: Monster[] = []

    async create(monster: MonsterCreate) {
        const dataMonster = {idMonster: this.items.length + 1, ...monster}
        this.items.push(dataMonster);

        return dataMonster;
    }

    async findById(idMonster: number) {
        const monster = this.items.find(item => item.idMonster === idMonster)

        if(!monster) {
            return null
        }

        return monster;
    }

    async findAll() {
        return this.items
    }
}