import type {monsterRepository} from '../../../contract/monstersRepository.ts'
import { ThereIsSomethingWrongWithIDsError } from '../../../error/ThereIsSomethingWrongWithIDsError.ts';
import { DamegeCalculator } from '../functions/DamegeCalculator.ts';

export class BattleMonstersUseCase {
    private readonly monstersRepository: monsterRepository

    constructor(service: monsterRepository) {
        this.monstersRepository = service
    }

    async execute(idAttacker: number, idDefender: number) {
        const monster1 = await this.monstersRepository.findById(idAttacker);
        const monster2 = await this.monstersRepository.findById(idDefender);

        if(!monster1 || !monster2) {
            throw new ThereIsSomethingWrongWithIDsError()
        }
        
        const damegeCalculator = new DamegeCalculator() 
        
        let temp;
        let attack = monster1;
        let defense = monster2;
        
        if(attack.speed < defense.speed) {
            temp = attack;
            attack = defense
            defense = temp
        }

        while(true) {
            defense.hp = defense.hp - damegeCalculator.calculate(attack, defense)

            if(defense.hp <= 0) return { winner: attack.name }

            temp = attack;
            attack = defense
            defense = temp
        }
    }
}