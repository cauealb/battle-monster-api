export interface Monsters {
    idMonster?: number
    name: string
    element: 'Fogo' | 'Água' | 'Planta'
    hp: number
    maxHp: number
    attack: number
    defense: number
    speed: number
}