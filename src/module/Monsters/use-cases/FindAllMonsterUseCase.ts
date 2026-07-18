import type { monsterRepository } from "../../../contract/monstersRepository.ts";

export class FindAllMonsterUseCase {
    constructor(private monsterRepository: monsterRepository) {}

    async execute() {
        return await this.monsterRepository.findAll()
    }
}