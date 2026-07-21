import { AppError } from "./AppError.ts";

export class ErrorSameMonsterInTheSameBattleError extends AppError {
    constructor() {
        super("Same monster in the same battle", 400)
    }
}