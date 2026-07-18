import type { monsterRepository } from "../../../contract/monstersRepository.ts";

export class FindByIdMonsterUseCase {
    constructor(private monsterRepository: monsterRepository) {}

    async execute(idMonster: number) {
        return this.monsterRepository.findById(idMonster)
    }
}