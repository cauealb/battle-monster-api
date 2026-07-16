import { monsterRepository } from "../../../contract/monstersRepository";
import { Monsters } from "../../../types/Monster";

export class inMemoryTestMonsters implements monsterRepository {
    private items: Monsters[] = []

    async create(monster: Monsters) {
        this.items.push(monster);
        return monster;
    }

    async findAll() {
        return this.items
    }
}