import type { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryTestMonsters } from "../../module/Monsters/repositories/InMemoryTestMonster.ts";
import { BattleMonstersUseCase } from "../../module/BattleMonsters/use-cases/BattleMonstersUseCase.ts";
import z from "zod";

export async function BattleMonsters(request: FastifyRequest, reply: FastifyReply) {
    const bodyBattleSchema = z.object({
        idMonster1: z.coerce.number(), idMonster2: z.coerce.number()
    })

    try {
        const dataBattle = bodyBattleSchema.safeParse(request.body);
        if(dataBattle.error) {
            throw new Error()
        }

        const repository = new InMemoryTestMonsters()
        const useCase = new BattleMonstersUseCase(repository)

        reply.status(200).send(useCase)
    } catch (ex) {
        reply.status(400).send()
    }
}