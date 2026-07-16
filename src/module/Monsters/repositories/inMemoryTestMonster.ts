import { monsterRepository } from "../../../contract/monstersRepository";
import { Monsters } from "../../../types/Monster";

export class InMemoryTestMonsters implements monsterRepository {
    private items: Monsters[] = []

    async create(monster: Monsters) {
        this.items.push(monster);
        return monster;
    }

    async findByName(nameMonster: string) {
        const monster = this.items.find(item => item.name === nameMonster)

        if(!monster) {
            return null
        }

        return monster;
    }

    async findAll() {
        return this.items
    }
}