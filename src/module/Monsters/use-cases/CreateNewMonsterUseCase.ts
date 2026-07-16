import { monsterRepository } from "../../../contract/monstersRepository";
import { Monsters } from "../../../types/Monster";

interface CreateNewMonsterUseCaseResponse {
    monster: Monsters
}

export class CreateNewMonsterUseCase {
    constructor(private monstersRepository: monsterRepository) {}

    async execute(data: Monsters): Promise<CreateNewMonsterUseCaseResponse> {
        const monster = await this.monstersRepository.create(data);
        return { monster }
    }
}