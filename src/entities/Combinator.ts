import HasConnections from "../connection/HasConnections"
import Entity         from "./Entity"


export default interface Combinator<Behavior = object> extends Entity, HasConnections {
    readonly control_behavior: Behavior
}