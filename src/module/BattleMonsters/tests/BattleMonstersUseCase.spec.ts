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
            maxHp: 100,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        await expect(async () => await sut.execute(monster.idMonster, monster.idMonster)).rejects.toBeInstanceOf(ErrorSameMonsterInTheSameBattleError)
    })

    it("should be able validate disadvantageous elements", async () => {
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
            name: "Leviatã",
            element: "Água",
            hp: 100,
            maxHp: 100,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        const result = await sut.execute(monster1.idMonster, monster2.idMonster)
        expect(result).toEqual(expect.objectContaining({
            winner: "Leviatã"
        }))
    })

    it("should be able validate battle with fire and plant", async () => {
        const monster1 = await repository.create({
            name: "Elemental do fogo",
            element: "Fogo",
            hp: 100,
            maxHp: 100,
            attack: 80,
            defense: 70,
            speed: 10,
        })

        const monster2 = await repository.create({
            name: "Espirradeira",
            element: "Planta",
            hp: 100,
            maxHp: 100,
            attack: 90,
            defense: 1,
            speed: 50,
        })

        const result = await sut.execute(monster1.idMonster, monster2.idMonster);
        expect(result).toEqual(expect.objectContaining({
            winner: "Elemental do fogo"
        }))
    })

    it("should be able validate battle with plant and water", async () => {
        const monster1 = await repository.create({
            name: "Espirradeira",
            element: "Planta",
            hp: 100,
            maxHp: 100,
            attack: 90,
            defense: 1,
            speed: 50,
        })

        const monster2 = await repository.create({
            name: "Leviatã",
            element: "Água",
            hp: 100,
            maxHp: 100,
            attack: 10,
            defense: 5,
            speed: 10,
        })

        const result = await sut.execute(monster1.idMonster, monster2.idMonster);
        expect(result).toEqual(expect.objectContaining({
            winner: "Espirradeira"
        }))
    })

    it("should be able validate minimum damage", async () => {
        const monster1 = await repository.create({
            name: "Espirradeira",
            element: "Planta",
            hp: 100,
            maxHp: 100,
            attack: 90,
            defense: 1,
            speed: 50,
        })

        const monster2 = await repository.create({
            name: "Leviatã",
            element: "Água",
            hp: 100,
            maxHp: 100,
            attack: 10,
            defense: 5,
            speed: 10,
        })
    })

    it("should be able validate execute the battle, and if the monsters same, winner is first monster", async () => {
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
            name: "Leviatã",
            element: "Fogo",
            hp: 100,
            maxHp: 100,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        const result = await sut.execute(monster1.idMonster, monster2.idMonster)
        expect(result).toEqual(expect.objectContaining({
            winner: "Dragão"
        }))
    })

    it("should be able validate monster hps before the battle", async () => {
        const hpMonster1 = 100;
        const hpMonster2 = 120;

        const monster1 = await repository.create({
            name: "Dragão",
            element: "Fogo",
            hp: hpMonster1,
            maxHp: hpMonster1,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        const monster2 = await repository.create({
            name: "Leviatã",
            element: "Água",
            hp: hpMonster2,
            maxHp: hpMonster2,
            attack: 50,
            defense: 5,
            speed: 80,
        })

        await sut.execute(monster1.idMonster, monster2.idMonster)

        const monster1Update = await repository.findById(monster1.idMonster);
        const monster2Update = await repository.findById(monster2.idMonster);

        const result = {
            monster1: monster1Update!.hp,
            monster2: monster2Update!.hp
        }

        expect(result).toEqual(expect.objectContaining({
            monster1: hpMonster1,
            monster2: hpMonster2
        }))

    })
})