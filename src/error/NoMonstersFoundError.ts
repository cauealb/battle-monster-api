export class NoMonstersFoundError extends Error {
    constructor() {
        super('No monsters found!')
    }
}