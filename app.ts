import fastify from "fastify";
import { AppRoutes } from "./src/http/routes.ts";

export const app = fastify()

app.register(AppRoutes)