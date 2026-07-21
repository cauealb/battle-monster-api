import { AppError } from "./AppError.ts";

export class ErrorSearchingForMonsterError extends AppError {
    constructor() {
        super('Error searching for monster; please try again later!', 400)
    }
}