import { AppError } from "./AppError.ts";

export class InvalidNameMonsterError extends AppError {
    constructor() {
        super('Invalid name monster!', 400)
    }
}