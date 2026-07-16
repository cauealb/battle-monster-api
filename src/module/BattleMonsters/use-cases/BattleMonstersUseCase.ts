import {monsterRepository} from '../../../contract/monstersRepository'
import { DamegeCalculator } from '../functions/DamegeCalculator';

export class BattleMonstersUseCase {
    constructor( 
        private monstersRepository: monsterRepository
    ) {}

    async execute(idAttacker: number, idDefender: number) {
        const monster1 = await this.monstersRepository.findById(idAttacker);
        const monster2 = await this.monstersRepository.findById(idDefender);

        if(!monster1 || !monster2) {
            throw new Error('')
        }

        const damegeCalculator = new DamegeCalculator() 
        while(monster1.hp <= 0 || monster2.hp <= 0) {
            let attack = monster1
            let defense = monster2

            damegeCalculator.calculate(attack, defense)
        }
    }
}