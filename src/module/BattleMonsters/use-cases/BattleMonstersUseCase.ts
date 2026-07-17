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
        
        let temp;
        let attack = monster1;
        let defense = monster2;
        let winner = '';
        
        if(attack.speed < defense.speed) {
            temp = attack;
            attack = defense
            defense = temp
        }

        while(true) {
            defense.hp = defense.hp - damegeCalculator.calculate(attack, defense)

            if(defense.hp <= 0) {
                winner = attack.name;
                break;
            }

            temp = attack;
            attack = defense
            defense = temp
        }

        return { winner } 
        // TODO: Refactor this!!
    }
}