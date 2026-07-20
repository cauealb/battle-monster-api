import type { MonsterCreateInput } from "../../../../generated/prisma/models.ts";
import type { monsterRepository } from "../../../contract/monstersRepository.ts";
import { InvalidHpMonsterError } from "../../../error/InvalidHpMonsterError.ts";
import { InvalidNameMonsterError } from "../../../error/InvalidNameMonsterError.ts";

export class CreateNewMonsterUseCase {
    private readonly monstersRepository: monsterRepository

    constructor(repository: monsterRepository) {
        this.monstersRepository = repository
    }

    async execute(data: MonsterCreateInput) {
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