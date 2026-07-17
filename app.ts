import fastify from "fastify";
import { AppRoutes } from "./src/http/routes.ts";

export const app = fastify()

app.setErrorHandler((error, request, reply) => {
    if(error instanceof Error) {
        reply.status(400).send({
            message: error.message
        })
    }
})

app.register(AppRoutes)
