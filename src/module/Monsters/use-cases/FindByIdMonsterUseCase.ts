import type { monsterRepository } from "../../../contract/monstersRepository.ts";

export class FindByIdMonsterUseCase {
    private readonly monstersRepository: monsterRepository

    constructor(service: monsterRepository) {
        this.monstersRepository = service
    }

    async execute(idMonster: number) {
        return this.monstersRepository.findById(idMonster)
    }
}