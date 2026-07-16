import { describe, it, beforeEach, expect } from 'vitest';
import { monsterRepository } from '../../../contract/monstersRepository';
import { BattleMonstersUseCase } from '../use-cases/BattleMonstersUseCase';
import { InMemoryTestMonsters } from '../../Monsters/repositories/InMemoryTestMonster';

let repository: monsterRepository
let sut: BattleMonstersUseCase

describe('Battle Monsters use case', () => {
    beforeEach(() => {
        repository = new InMemoryTestMonsters
        sut = new BattleMonstersUseCase(repository)
    })

    it("should be able show the winner monster after battle", async () => {
        await repository.create({
            name: "Dragão",
            element: "Fogo",
            hp: 100,
            maxHp: 100,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        await repository.create({
            name: "Goblin",
            element: "Água",
            hp: 100,
            maxHp: 100,
            attack: 10,
            defense: 0,
            speed: 90,
        })

        const result = await sut.execute("Dragão", "Goblin")
        expect(result).toEqual(expect.objectContaining({
            winner: "Dragão"
        }))
    })
})