import ConnectionPoint from "../connection/ConnectionPoint"
import Position        from "../Position"
import Signal          from "../Signal"
import Combinator      from "./Combinator"
import { EntityId }    from "./Entity"


type Comparator = ">" | "<" | "=" | "≥" | "≤" | "≠"

type Behavior = {
    circuit_condition: {
        first_signal?: Signal
        second_signal?: Signal
        constant?: number
        comparator: Comparator
    }
    use_colors: boolean
}

export default class SmallLamp implements Combinator {
    readonly name = "small-lamp"
    position = new Position(0, 0)
    direction = 0

    readonly connections = {
        "1": new ConnectionPoint(),
        "2": new ConnectionPoint()
    }

    readonly control_behavior: Behavior = {
        circuit_condition: {
            comparator: "<"
        },
        use_colors: false
    }

    constructor(
        readonly entity_number: EntityId
    ) {}

    useColors(use: boolean = true) {
        this.control_behavior.use_colors = use
        return this
    }

    setLeft(value?: Signal) {
        this.setOptionalSignal("first_signal", value)
        return this
    }

    setRight(value?: Signal | number) {
        delete this.control_behavior.circuit_condition.second_signal
        delete this.control_behavior.circuit_condition.constant

        if (typeof value === "number") {
            this.control_behavior.circuit_condition.constant = value
        } else {
            this.setOptionalSignal("second_signal", value)
        }

        return this
    }

    setComparator(comparator: Comparator) {
        this.control_behavior.circuit_condition.comparator = comparator
        return this
    }

    private setOptionalSignal(signalKey: "first_signal" | "second_signal", value?: Signal) {
        if (value) {
            this.control_behavior.circuit_condition[signalKey] = value
        } else {
            delete this.control_behavior.circuit_condition[signalKey]
        }
    }
}