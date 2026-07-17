import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

async function CreateMonster(request: FastifyRequest, reply: FastifyReply) {
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
        

    } catch(ex) {

    }
}