export class InvalidInputMonsterError extends Error {
    constructor() {
        super('Some parameters is invalid for creating a monster')
    }
}