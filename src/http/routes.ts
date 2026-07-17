import type { FastifyInstance } from "fastify";
import { CreateMonster } from "./controllers/CreateMonsters.controller.ts";

export function AppRoutes(app: FastifyInstance) {
    app.post('/monsters', CreateMonster)
}