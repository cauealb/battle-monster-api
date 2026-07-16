import { monsterRepository } from "../../../contract/monstersRepository";
import { InvalidNameMonsterError } from "../../../error/InvalidNameMonsterError";
import { Monsters } from "../../../types/Monster";

interface CreateNewMonsterUseCaseResponse {
    monster: Monsters
}

export class CreateNewMonsterUseCase {
    constructor(private monstersRepository: monsterRepository) {}

    async execute(data: Monsters): Promise<CreateNewMonsterUseCaseResponse> {
        if(data.name.length === 0) {
            throw new InvalidNameMonsterError()
        }

        const monster = await this.monstersRepository.create(data);
        return { monster }
    }
}