import Blueprint            from "./Blueprint"
import makeConnection       from "./connection/makeConnection"
import ArithmeticCombinator from "./entities/ArithmeticCombinator"
import ConstantCombinator   from "./entities/ConstantCombinator"
import Position             from "./Position"
import createLetterSignal   from "./utils/createLetterSignal"
import encode               from "./utils/encode"


const blueprint = new Blueprint("Mine", [createLetterSignal("A")])

const arithmetic = blueprint.createEntity(id => new ArithmeticCombinator(id))
arithmetic.position = new Position(1.5, 0)
arithmetic.direction = 2

const constant = blueprint.createEntity(id => new ConstantCombinator(id))
constant.position = new Position(0, 0)
constant.direction = 2

constant.addFilter(createLetterSignal("A"), 10)

arithmetic.setLeft(createLetterSignal("A"))
arithmetic.setRight(1)
arithmetic.setOutput(createLetterSignal("S"))

makeConnection()
    .from(constant, "1")
    .to(arithmetic, "1")
    .withRedWire()

console.log(encode(blueprint))
