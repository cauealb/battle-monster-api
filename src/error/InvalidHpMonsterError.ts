import { AppError } from "./AppError.ts";

export class InvalidHpMonsterError extends AppError {
    constructor() {
        super('Invalid HP Monster!', 400)
    }
}