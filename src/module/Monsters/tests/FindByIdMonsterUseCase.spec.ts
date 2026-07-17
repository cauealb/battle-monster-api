import { beforeEach, describe, expect, it } from 'vitest';
import { monsterRepository } from '../../../contract/monstersRepository';
import { InMemoryTestMonsters } from '../repositories/InMemoryTestMonster';
import { FindByIdMonsterUseCase } from '../use-cases/FindByIdMonsterUseCase';

let repository: monsterRepository
let sut: FindByIdMonsterUseCase

describe("Find by id monster Use case", () => {
    beforeEach(() => {
        repository = new InMemoryTestMonsters()
        sut = new FindByIdMonsterUseCase(repository)
    })

    it("should be able find by id monster", async () => {
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

        const result = await sut.execute(2);
        expect(result).toEqual(expect.objectContaining({
            name: "Goblin"
        }))
    })
})