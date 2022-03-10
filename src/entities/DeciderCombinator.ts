import ConnectionPoint from "../connection/ConnectionPoint"
import Position        from "../Position"
import Signal          from "../Signal"
import Combinator      from "./Combinator"
import { EntityId }    from "./Entity"


type Comparator = ">" | "<" | "=" | "≥" | "≤" | "≠"

type Behavior = {
    decider_conditions: {
        first_signal?: Signal,
        second_signal?: Signal,
        second_constant?: number,
        output_signal?: Signal,

        comparator: Comparator
    }
}

export default class DeciderCombinator implements Combinator<Behavior> {
    readonly name = "decider-combinator"
    position = new Position(0, 0)
    direction = 0

    readonly connections = {
        "1": new ConnectionPoint(),
        "2": new ConnectionPoint()
    }

    readonly control_behavior: Behavior = {
        decider_conditions: {
            comparator: "<"
        }
    }

    constructor(
        readonly entity_number: EntityId
    ) {}

    setLeft(value?: Signal) {
        this.setOptionalSignal("first_signal")
        return this
    }

    setRight(value?: Signal | number) {
        delete this.control_behavior.decider_conditions.second_signal
        delete this.control_behavior.decider_conditions.second_constant

        if (typeof value === "number") {
            this.control_behavior.decider_conditions.second_constant = value
        } else {
            this.setOptionalSignal("second_signal", value)
        }

        return this
    }

    setComparator(comparator: Comparator) {
        this.control_behavior.decider_conditions.comparator = comparator
        return this
    }

    setOutput(value?: Signal) {
        this.setOptionalSignal("output_signal")
        return this
    }

    private setOptionalSignal(signalKey: "first_signal" | "second_signal" | "output_signal", value?: Signal) {
        if (value) {
            this.control_behavior.decider_conditions[signalKey] = value
        } else {
            delete this.control_behavior.decider_conditions[signalKey]
        }
    }
}