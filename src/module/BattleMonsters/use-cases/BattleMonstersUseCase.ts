import {monsterRepository} from '../../../contract/monstersRepository'
import { DamegeCalculator } from '../functions/DamegeCalculator';

export class BattleMonstersUseCase {
    constructor( 
        private monstersRepository: monsterRepository
    ) {}

    async execute(nameAttacker: string, nameDefender: string) {
        const monster1 = await this.monstersRepository.findByName(nameAttacker);
        const monster2 = await this.monstersRepository.findByName(nameDefender);

        if(!monster1 || !monster2) {
            throw new Error('')
        }

        const damegeCalculator = new DamegeCalculator() 
        while(monster1.hp <= 0 || monster2.hp <= 0) {
            let attack = monster1;
            let defense = monster2;
            
            defense.hp = defense.hp - damegeCalculator.calculate(attack, defense)

            let temp = attack;
            attack = defense
            defense = temp
        }
    }
}