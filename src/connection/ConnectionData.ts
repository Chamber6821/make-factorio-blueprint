import { EntityId } from "../entities/Entity"


export default class ConnectionData {
    constructor(
        readonly entity_id: EntityId,
        readonly circuit_id: number
    ) {}
}