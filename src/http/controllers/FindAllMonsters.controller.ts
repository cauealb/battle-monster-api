import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaMonsterRepository } from "../../repositories/PrismaMonsterRepository.ts";
import { FindAllMonsterUseCase } from "../../module/Monsters/use-cases/FindAllMonsterUseCase.ts";

export async function FindAllMonters(_: FastifyRequest, reply: FastifyReply) {
    try {
        const repository = new PrismaMonsterRepository()
        const useCase = new FindAllMonsterUseCase(repository)

        const monsters = await useCase.execute()
        reply.status(200).send(monsters)
    } catch(ex) {
        throw ex
    }
}