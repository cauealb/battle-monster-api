import { beforeEach, describe, expect, it } from 'vitest';
import type { monsterRepository } from '../../../contract/monstersRepository.ts';
import { FindAllMonsterUseCase } from '../use-cases/FindAllMonsterUseCase.ts';
import { InMemoryTestMonsters } from '../../../repositories/InMemoryTestMonster.ts';

let repository: monsterRepository
let sut: FindAllMonsterUseCase

describe("Find all monster use case test", () => {
    beforeEach(() => {
        repository = new InMemoryTestMonsters()
        sut = new FindAllMonsterUseCase(repository)
    })

    it("should be able find all monsters", async () => {
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

        const result = await sut.execute();
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: "Dragão" }),
            expect.objectContaining({ name: "Goblin" })
        ]))
    })
})