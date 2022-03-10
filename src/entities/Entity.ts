import Position from "../Position"


export type EntityId = number

export default interface Entity {
    readonly entity_number: EntityId,
    readonly name: string,
    position: Position,
    direction: number
}
