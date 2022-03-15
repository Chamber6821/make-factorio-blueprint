import ConnectionPoint from "../connection/ConnectionPoint"
import Position        from "../Position"
import Signal          from "../Signal"
import Combinator      from "./Combinator"
import { EntityId }    from "./Entity"


export type Operation = "*" | "/" | "+" | "-" | "%" | "^" | "<<" | ">>" | "AND" | "OR" | "XOR"

type Behavior = {
    arithmetic_conditions: {
        first_signal?: Signal
        first_constant?: number
        second_signal?: Signal
        second_constant?: number
        output_signal?: Signal

        operation: Operation
    }
}

export default class ArithmeticCombinator implements Combinator<Behavior> {
    readonly name = "arithmetic-combinator"
    position = new Position(0, 0)
    direction = 0

    readonly connections = {
        "1": new ConnectionPoint(),
        "2": new ConnectionPoint()
    }

    readonly control_behavior: Behavior = {
        arithmetic_conditions: {
            operation: "*"
        }
    }

    constructor(
        readonly entity_number: EntityId
    ) {}

    setLeft(value: Signal | number | undefined) {
        this.setOperand("first_signal", "first_constant", value)
        return this
    }

    setRight(value: Signal | number | undefined) {
        this.setOperand("second_signal", "second_constant", value)
        return this
    }

    setOperation(operation: Operation) {
        this.control_behavior.arithmetic_conditions.operation = operation
        return this
    }

    setOutput(value: Signal | undefined) {
        if (value) {
            this.control_behavior.arithmetic_conditions.output_signal = value
        } else {
            delete this.control_behavior.arithmetic_conditions.output_signal
        }

        return this
    }

    private setOperand(signalKey: "first_signal" | "second_signal",
                       constantKey: "first_constant" | "second_constant",
                       value: Signal | number | undefined) {
        delete this.control_behavior.arithmetic_conditions[signalKey]
        delete this.control_behavior.arithmetic_conditions[constantKey]

        if (!value) {
            return this
        }

        if (value instanceof Signal) {
            this.control_behavior.arithmetic_conditions[signalKey] = value
        } else {
            this.control_behavior.arithmetic_conditions[constantKey] = value
        }
    }
}