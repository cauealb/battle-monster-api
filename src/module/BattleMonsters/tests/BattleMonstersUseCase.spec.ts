import { describe, it, beforeEach, expect } from 'vitest';
import type { monsterRepository } from '../../../contract/monstersRepository.ts';
import { BattleMonstersUseCase } from '../use-cases/BattleMonstersUseCase.ts';
import { InMemoryTestMonsters } from '../../Monsters/repositories/InMemoryTestMonster.ts';

let repository: monsterRepository
let sut: BattleMonstersUseCase

describe('Battle Monsters use case', () => {
    beforeEach(() => {
        repository = new InMemoryTestMonsters
        sut = new BattleMonstersUseCase(repository)
    })

    it("should be able show the winner monster after battle", async () => {
        const monster1 = await repository.create({
            name: "Dragão",
            element: "Fogo",
            hp: 100,
            maxHp: 100,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        const monster2 = await repository.create({
            name: "Arcanjo",
            element: "Água",
            hp: 500,
            maxHp: 500,
            attack: 90,
            defense: 90,
            speed: 100,
        })
        
        const result = await sut.execute(monster1.idMonster!, monster2.idMonster!)
        expect(result).toEqual(expect.objectContaining({
            winner: "Arcanjo"
        }))
    })
})