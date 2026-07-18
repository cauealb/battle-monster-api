import type { monsterRepository } from "../contract/monstersRepository.js";
import type { Monsters } from "../types/Monster.ts";

export class InMemoryTestMonsters implements monsterRepository {
    private items: Monsters[] = []

    async create(monster: Monsters) {
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