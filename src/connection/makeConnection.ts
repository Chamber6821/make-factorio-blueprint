import { EntityId }    from "../entities/Entity"
import ConnectionData  from "./ConnectionData"
import ConnectionPoint from "./ConnectionPoint"
import HasConnections  from "./HasConnections"


type Side = keyof HasConnections["connections"]
type Color = keyof ConnectionPoint

/**
 * Example: makeConnection().from(...).to(...).withRedWire()
 */
export default function makeConnection() {
    return {
        from(entity1: HasConnections, side1: Side) {
            return {
                to(entity2: HasConnections, side2: Side) {
                    const withWire = (color: Color) => connect(
                        new References(entity1, side1, color),
                        new References(entity2, side2, color)
                    )

                    return {
                        withWire,
                        withRedWire: () => withWire("red"),
                        withGreenWire: () => withWire("green")
                    }
                }
            }
        }
    }
}

class References {
    readonly id: EntityId
    readonly connections: ConnectionData[]
    readonly side: number

    constructor(entity: HasConnections, side: Side, color: Color) {
        this.id = entity.entity_number
        this.connections = entity.connections[side][color]
        this.side = parseInt(side)
    }
}

function connect(first: References, second: References) {
    first.connections.push({
        entity_id: second.id,
        circuit_id: second.side
    })

    second.connections.push({
        entity_id: first.id,
        circuit_id: first.side
    })
}