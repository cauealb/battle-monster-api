import { AppError } from "./AppError.ts";

export class ThereIsSomethingWrongWithIDsError extends AppError {
    constructor() {
        super('There is something wrong with one of these monsters; please check the provided IDs.', 404)
    }
}