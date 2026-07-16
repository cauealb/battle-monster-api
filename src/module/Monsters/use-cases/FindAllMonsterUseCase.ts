import { monsterRepository } from "../../../contract/monstersRepository";

export class FindAllMonsterUseCase {
    constructor(private monsterRepository: monsterRepository) {}

    async execute() {
        return await this.monsterRepository.findAll()
    }
}