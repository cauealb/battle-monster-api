import { describe, it, beforeEach, expect } from 'vitest';
import type { monsterRepository } from '../../../contract/monstersRepository.ts';
import { BattleMonstersUseCase } from '../use-cases/BattleMonstersUseCase.ts';
import { InMemoryTestMonsters } from '../../../repositories/InMemoryTestMonster.ts';
import { ThereIsSomethingWrongWithIDsError } from '../../../error/ThereIsSomethingWrongWithIDsError.ts';
import { ErrorSameMonsterInTheSameBattleError } from '../../../error/ErrorSameMonsterInTheSameBattleError.ts';

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

    it("should be able to verify whether the monster was created before the battle.", async () => {
        await expect(async () => await sut.execute(3, 4)).rejects.toBeInstanceOf(ThereIsSomethingWrongWithIDsError)
    })

    it("should be able if is same monster (Attack and Defense)", async () => {
        const monster = await repository.create({
            name: "Dragão",
            element: "Fogo",
            hp: 100,
            maxHp: 50,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        await expect(async () => await sut.execute(monster.idMonster, monster.idMonster)).rejects.toBeInstanceOf(ErrorSameMonsterInTheSameBattleError)
    })

    it("should be able validate elements advantageous", async () => {
        const monster1 = await repository.create({
            name: "Dragão",
            element: "Fogo",
            hp: 100,
            maxHp: 50,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        const monster2 = await repository.create({
            name: "Leviatã",
            element: "Água",
            hp: 100,
            maxHp: 50,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        const result = await sut.execute(monster1.idMonster, monster2.idMonster)
        expect(result).toEqual(expect.objectContaining({
            winner: "Leviatã"
        }))
    })

    it("should be able validade monster same speed", async () => {
        const monster1 = await repository.create({
            name: "Guan-ferrão",
            element: "Planta",
            hp: 100,
            maxHp: 50,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        const monster2 = await repository.create({
            name: "Guan-ferrão",
            element: "Planta",
            hp: 100,
            maxHp: 50,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        const result = await sut.execute(monster1.idMonster, monster2.idMonster)
        expect(result).toEqual(expect.objectContaining({
            winner: "Guan-ferrão"
        }))
    })
})