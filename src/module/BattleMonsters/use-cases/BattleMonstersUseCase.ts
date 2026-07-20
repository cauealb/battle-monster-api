import type {monsterRepository} from '../../../contract/monstersRepository.ts'
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
            throw new Error('Error')
        }
        
        const damegeCalculator = new DamegeCalculator() 
        
        let temp;
        let attack = monster1;
        let defense = monster2;
        let winner = '';
        
        if(attack.speed < defense.speed) {
            temp = attack;
            attack = defense
            defense = temp
        }

        while(defense.hp > 0) {
            temp = attack;
            attack = defense
            defense = temp

            defense.hp = defense.hp - damegeCalculator.calculate(attack, defense)
        }

        return { winner: attack.name }
    }
}