import type {monsterRepository} from '../../../contract/monstersRepository.ts'
import { ErrorSameMonsterInTheSameBattleError } from '../../../error/ErrorSameMonsterInTheSameBattleError.ts';
import { ThereIsSomethingWrongWithIDsError } from '../../../error/ThereIsSomethingWrongWithIDsError.ts';
import { DamageCalculator } from '../functions/DamageCalculator.ts';

export class BattleMonstersUseCase {
    private readonly monstersRepository: monsterRepository

    constructor(service: monsterRepository) {
        this.monstersRepository = service
    }

    async execute(idAttacker: number, idDefender: number) {
        if(idAttacker === idDefender) throw new ErrorSameMonsterInTheSameBattleError()

        const monster1 = await this.monstersRepository.findById(idAttacker);
        const monster2 = await this.monstersRepository.findById(idDefender);

        if(!monster1 || !monster2) {
            throw new ThereIsSomethingWrongWithIDsError()
        }
        
        const damegeCalculator = new DamageCalculator() 
        
        let temp;
        let attack = monster1;
        let defender = monster2;
        
        if(attack.speed < defender.speed) {
            temp = attack;
            attack = defender
            defender = temp
        }

        while(true) {
            defender.hp = defender.hp - damegeCalculator.calculate(attack, defender)

            if(defender.hp <= 0) return { winner: attack.name }

            temp = attack;
            attack = defender
            defender = temp
        }
    }
}