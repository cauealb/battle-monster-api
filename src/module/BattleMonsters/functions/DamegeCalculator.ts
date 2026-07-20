import type { Monster } from "../../../../generated/prisma/browser.ts";

export class DamegeCalculator {
    calculate(attacker: Monster, defender: Monster) {
        const multiplacateElement: number = Math.max(this.getMultiplicate(attacker.element, defender.element))
        let attack = (attacker.attack - defender.defense) * multiplacateElement;

        return attack
    }

    getMultiplicate(attackerElement: string, defenseElement: string) {
        if(attackerElement === defenseElement) return 1;
        if(attackerElement === 'Fogo' && defenseElement === 'Planta') return 1.25;
        if(attackerElement === 'Planta' && defenseElement === 'Água') return 1.25;
        if(attackerElement === 'Água' && defenseElement === 'Fogo') return 1.25;

        return 0.75;
    }
}