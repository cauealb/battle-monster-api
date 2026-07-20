import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaMonsterRepository } from "../../repositories/PrismaMonsterRepository.ts";
import { FindByIdMonsterUseCase } from "../../module/Monsters/use-cases/FindByIdMonsterUseCase.ts";
import z from "zod";

export async function FindByIdMonster(request: FastifyRequest, reply: FastifyReply) {
    const idParamsShema = z.object({ idMonster: z.coerce.number() });

    try {
        const data = idParamsShema.safeParse(request.params);
        if(!data.success) {
            throw new Error()
        }

        const repository = new PrismaMonsterRepository()
        const useCase = new FindByIdMonsterUseCase(repository)

        const monster = await useCase.execute(data.data.idMonster);
        reply.status(200).send(monster)

    } catch (ex) {
        throw ex
    }
}