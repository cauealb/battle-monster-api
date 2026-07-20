import fastify from "fastify";
import { AppRoutes } from "./src/http/routes.ts";
import { AppError } from "./src/error/AppError.ts";

export const app = fastify()

app.setErrorHandler((error, request, reply) => {
    if(error instanceof AppError) {
        return reply.status(error.statusCode).send({
            message: error.message === "" ? "Internal server error" : error.message
        })
    }

    return reply.status(500).send({
        message: "Internal server error"
    })
})

app.register(AppRoutes)
