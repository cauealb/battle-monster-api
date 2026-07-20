import type { FastifyInstance } from "fastify";
import { CreateMonster } from "./controllers/CreateMonsters.controller.ts";
import { BattleMonsters } from "./controllers/BattleMonsters.controller.ts";
import { FindAllMonters } from "./controllers/FindAllMonsters.controller.ts";

export function AppRoutes(app: FastifyInstance) {
    app.post('/monsters', CreateMonster)
    app.post('/battle', BattleMonsters)

    app.get('/monsters', FindAllMonters)
    // app.get('/monsters/:id')
}