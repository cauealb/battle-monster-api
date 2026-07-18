import { beforeEach, describe, expect, it } from 'vitest';
import type { monsterRepository } from '../../../contract/monstersRepository.ts';
import { CreateNewMonsterUseCase } from '../use-cases/CreateNewMonsterUseCase.ts';
import { InMemoryTestMonsters } from '../../../repositories/InMemoryTestMonster.ts';
import type { Monsters } from '../../../types/Monster.ts';
import { InvalidNameMonsterError } from '../../../error/InvalidNameMonsterError.ts';
import { InvalidHpMonsterError } from '../../../error/InvalidHpMonsterError.ts';

let repository: monsterRepository
let sut: CreateNewMonsterUseCase

describe("Create new monster use case test", () => {
    beforeEach(() => {
        repository = new InMemoryTestMonsters;
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
        expect(result).toEqual(expect.objectContaining({name: "Dragão", element: "Fogo"})
        )
    })

    it("should be able validate name monster", async () => {
        const monster: Monsters = {
            name: "",
            element: "Fogo",
            hp: 100,
            maxHp: 100,
            attack: 50,
            defense: 5,
            speed: 80,
        }

        await expect(async () => await sut.execute(monster)).rejects.toBeInstanceOf(InvalidNameMonsterError)
    })

    it("should be able validate hp and maxHp",async () => {
        const monster: Monsters = {
            name: "Dragão",
            element: "Fogo",
            hp: 100,
            maxHp: 50,
            attack: 50,
            defense: 5,
            speed: 80,
        }

        await expect(async () => await sut.execute(monster)).rejects.toBeInstanceOf(InvalidHpMonsterError)
    })
})