import { AppError } from "./AppError.ts";

export class NoMonstersFoundError extends AppError {
    constructor() {
        super('No monsters found!', 404)
    }
}