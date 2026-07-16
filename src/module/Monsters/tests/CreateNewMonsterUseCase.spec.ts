import { beforeEach, describe, expect, it } from 'vitest';
import { monsterRepository } from '../../../contract/monstersRepository';
import { CreateNewMonsterUseCase } from '../use-cases/CreateNewMonsterUseCase';
import { inMemoryTestMonsters } from '../repositories/inMemoryTestMonster';
import { Monsters } from '../../../types/Monster';

let repository: monsterRepository
let sut: CreateNewMonsterUseCase

describe("Create new monster use case test", () => {
    // Red
    // Green
    // Refactor

    beforeEach(() => {
        repository = new inMemoryTestMonsters;
        sut = new CreateNewMonsterUseCase(repository);
    })

    it("should be able create a new monster", async () => {
        const monster: Monsters = {
            name: "Dragão",
            element: "Fogo",
            hp: 100,
            maxHp: 100,
            attack: 50,
            defense: 5,
            speed: 80,
        }

        const result = await sut.execute(monster)
        expect(result).toEqual(expect.objectContaining({monster})
        )
    })
})