import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaMonsterRepository } from "../../repositories/PrismaMonsterRepository.ts";
import { FindAllMonsterUseCase } from "../../module/Monsters/use-cases/FindAllMonsterUseCase.ts";
import { NoMonstersFoundError } from "../../error/NoMonstersFoundError.ts";

export async function FindAllMonters(request: FastifyRequest, reply: FastifyReply) {
    try {
        const repository = new PrismaMonsterRepository()
        const useCase = new FindAllMonsterUseCase(repository)

        const monsters = await useCase.execute()
        if(monsters.length === 0) {
            throw new NoMonstersFoundError()
        }

        reply.status(200).send(monsters)
    } catch(ex) {
        throw ex
    }
}