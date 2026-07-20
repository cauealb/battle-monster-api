import type { monsterRepository } from "../../../contract/monstersRepository.ts";

export class FindAllMonsterUseCase {
    private readonly monstersRepository: monsterRepository

    constructor(service: monsterRepository) {
        this.monstersRepository = service
    }

    async execute() {
        return await this.monstersRepository.findAll()
    }
}