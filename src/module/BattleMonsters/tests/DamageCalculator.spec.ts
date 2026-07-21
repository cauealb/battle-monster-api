import { describe, it, beforeEach, expect } from 'vitest';
import { DamageCalculator } from '../functions/DamageCalculator.ts';

let sut: DamageCalculator

describe("Damage Calculator test", () => {
    beforeEach(() => {
        sut = new DamageCalculator()
    })

    it("should be able validate minimum damage", async () => {
        const monster1 = {
            idMonster: 1,
            name: "Espirradeira",
            element: "Planta",
            hp: 100,
            maxHp: 100,
            attack: 50,
            defense: 1,
            speed: 50,
        }
    
        const monster2 = {
            idMonster: 2,
            name: "Goblin",
            element: "Planta",
            hp: 100,
            maxHp: 100,
            attack: 10,
            defense: 60,
            speed: 10,
        }

        const damege = sut.calculate(monster1, monster2);
        expect(damege).toBe(1)
    })
})