import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { InMemoryTestMonsters } from "../../module/Monsters/repositories/InMemoryTestMonster.ts";
import { CreateNewMonsterUseCase } from "../../module/Monsters/use-cases/CreateNewMonsterUseCase.ts";

export async function CreateMonster(request: FastifyRequest, reply: FastifyReply) {
    const bodyMonstersSchema = z.object({
        name: z.string(),
        element: z.enum(["Fogo", "Planta", "Água"]),
        hp: z.number(),
        maxHp: z.number(),
        attack: z.number(),
        defense: z.number(),
        speed: z.number()
    })

    try {
        const data = bodyMonstersSchema.safeParse(request.body);
        if(data.error) {
            throw new Error('Error')
        }
        
        const repository = new InMemoryTestMonsters()
        const useCase = new CreateNewMonsterUseCase(repository)
        reply.status(201).send(useCase)
    } catch(ex) {

    }
}