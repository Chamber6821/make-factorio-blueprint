import Entity          from "../entities/Entity"
import ConnectionPoint from "./ConnectionPoint"


export default interface HasConnections extends Entity {
    readonly connections: {
        "1": ConnectionPoint,
        "2": ConnectionPoint
    }
}