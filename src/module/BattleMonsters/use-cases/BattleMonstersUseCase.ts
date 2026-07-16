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
        let attack = monster1;
        let defense = monster2;

        while(attack.hp <= 0 || defense.hp <= 0) {
            defense.hp = defense.hp - damegeCalculator.calculate(attack, defense)

            let temp = attack;
            attack = defense
            defense = temp
        }

        let winner = '';
        if(attack.hp <= 0) {
            winner = defense.name
        }
        winner = attack.name

        return { winner }
    }
}