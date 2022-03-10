import ConnectionPoint from "../connection/ConnectionPoint"
import Position        from "../Position"
import Signal          from "../Signal"
import Combinator      from "./Combinator"
import { EntityId }    from "./Entity"


interface Filter {
    readonly signal: Signal,
    readonly count: number,
    readonly index: number
}

type Behavior = { filters: Filter[] }

export default class ConstantCombinator implements Combinator<Behavior> {
    readonly name: string = "constant-combinator"
    position = new Position(0, 0)
    direction = 0

    readonly connections = {
        "1": new ConnectionPoint(),
        "2": new ConnectionPoint()
    }

    readonly control_behavior: Behavior = { filters: [] }

    constructor(
        readonly entity_number: EntityId
    ) {}

    addFilter(signal: Signal, count: number) {
        const index = this.control_behavior.filters.length + 1
        this.control_behavior.filters.push({ signal, count, index })
    }
}