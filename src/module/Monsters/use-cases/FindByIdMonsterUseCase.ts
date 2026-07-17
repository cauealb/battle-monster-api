import { monsterRepository } from "../../../contract/monstersRepository";

export class FindByIdMonsterUseCase {
    constructor(private monsterRepository: monsterRepository) {}

    async execute(idMonster: number) {
        return this.monsterRepository.findById(idMonster)
    }
}