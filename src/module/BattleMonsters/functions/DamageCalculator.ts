import type { Monster } from "../../Monsters/types/Monster.ts";

export class DamageCalculator {
    calculate(attacker: Monster, defender: Monster) {
        const multiplierElement: number = this.getMultiplicate(attacker.element, defender.element);
        let attack = (attacker.attack - defender.defense) * multiplierElement;

        return attack <= 0 ? 1 : attack
    }

    getMultiplicate(attackerElement: string, defenseElement: string) {
        if(attackerElement === defenseElement) return 1;
        if(attackerElement === 'Fogo' && defenseElement === 'Planta') return 1.25;
        if(attackerElement === 'Planta' && defenseElement === 'Água') return 1.25;
        if(attackerElement === 'Água' && defenseElement === 'Fogo') return 1.25;

        return 0.75;
    }
}