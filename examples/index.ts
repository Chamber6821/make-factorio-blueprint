import Blueprint            from "../src/Blueprint"
import makeConnection       from "../src/connection/makeConnection"
import ArithmeticCombinator from "../src/entities/ArithmeticCombinator"
import ConstantCombinator   from "../src/entities/ConstantCombinator"
import Position             from "../src/Position"
import Signal               from "../src/Signal"
import encode               from "../src/utils/encode"


const blueprint = new Blueprint("Mine", [Signal.virtual("A")])

const arithmetic = blueprint.createEntity(id => new ArithmeticCombinator(id))
arithmetic.position = new Position(1.5, 0)
arithmetic.direction = 2

const constant = blueprint.createEntity(id => new ConstantCombinator(id))
constant.position = new Position(0, 0)
constant.direction = 2

constant.addFilter(Signal.virtual("A"), 10)

arithmetic.setLeft(Signal.virtual("A"))
arithmetic.setRight(1)
arithmetic.setOutput(Signal.virtual("S"))

makeConnection()
    .from(constant, "1")
    .to(arithmetic, "1")
    .withRedWire()

console.log(encode(blueprint))
