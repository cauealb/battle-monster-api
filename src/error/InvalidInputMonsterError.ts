import { AppError } from "./AppError.ts";

export class InvalidInputMonsterError extends AppError {
    constructor() {
        super('Some parameters is invalid for creating a monster', 400)
    }
}