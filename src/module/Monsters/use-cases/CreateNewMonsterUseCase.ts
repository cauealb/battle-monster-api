import { monsterRepository } from "../../../contract/monstersRepository";
import { InvalidHpMonsterError } from "../../../error/InvalidHpMonsterError";
import { InvalidNameMonsterError } from "../../../error/InvalidNameMonsterError";
import { Monsters } from "../../../types/Monster";

export class CreateNewMonsterUseCase {
    constructor(private monstersRepository: monsterRepository) {}

    async execute(data: Monsters) {
        if(data.name.length === 0) {
            throw new InvalidNameMonsterError()
        }

        if(data.maxHp < data.hp) {
            throw new InvalidHpMonsterError()
        }

        const monster = await this.monstersRepository.create(data);
        return monster
    }
}