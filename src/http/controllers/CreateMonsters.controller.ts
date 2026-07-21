import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateNewMonsterUseCase } from "../../module/Monsters/use-cases/CreateNewMonsterUseCase.ts";
import { InvalidInputMonsterError } from "../../error/InvalidInputMonsterError.ts";
import { PrismaMonsterRepository } from "../../repositories/PrismaMonsterRepository.ts";
import z from "zod";

export async function CreateMonster(request: FastifyRequest, reply: FastifyReply) {
    const bodyMonstersSchema = z.object({
        name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
        element: z.enum(["Fogo", "Planta", "Água"]),
        hp: z.number().positive().int(),
        maxHp: z.number().positive().int(),
        attack: z.number().positive().int(),
        defense: z.number().positive().int(),
        speed: z.number().positive().int()
    })
    
    try {
        const data = bodyMonstersSchema.safeParse(request.body);
        if(!data.success) {
            throw new InvalidInputMonsterError()
        }
        
        const repository = new PrismaMonsterRepository()
        const useCase = new CreateNewMonsterUseCase(repository)
        const monster = await useCase.execute(data.data)

        reply.status(201).send(monster)
    } catch(ex) {
        throw ex
    }
}