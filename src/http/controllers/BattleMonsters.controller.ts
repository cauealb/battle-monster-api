import type { FastifyReply, FastifyRequest } from "fastify";
import { BattleMonstersUseCase } from "../../module/BattleMonsters/use-cases/BattleMonstersUseCase.ts";
import { PrismaMonsterRepository } from "../../repositories/PrismaMonsterRepository.ts";
import { ErrorSearchingForMonsterError } from "../../error/ErrorSearchingForMonsterError.ts";
import z from "zod";

export async function BattleMonsters(request: FastifyRequest, reply: FastifyReply) {
    const bodyBattleSchema = z.object({
        idMonster1: z.coerce.number().positive().int(), idMonster2: z.coerce.number().positive().int()
    })

    try {
        const dataBattle = bodyBattleSchema.safeParse(request.body);
        if(dataBattle.error) {
            throw new ErrorSearchingForMonsterError()
        }

        const repository = new PrismaMonsterRepository()
        const useCase = new BattleMonstersUseCase(repository)
        const winner = await useCase.execute(dataBattle.data.idMonster1, dataBattle.data.idMonster2)

        reply.status(200).send(winner)
    } catch (ex) {
        throw ex
    }
}