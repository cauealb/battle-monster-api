export class InvalidInputMonsterError extends Error {
    constructor() {
        super('Some parameters for creating a monster')
    }
}