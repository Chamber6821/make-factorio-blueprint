import Entity, { EntityId } from "./entities/Entity"


type Creator<T extends Entity> = (id: EntityId) => T

export default Creator