import { AppError } from "./AppError.ts";

export class NoMonsterFoundError extends AppError {
    constructor() {
        super('No monster found!', 404)
    }
}