import Blueprint          from "../src/Blueprint"
import makeConnection     from "../src/connection/makeConnection"
import ConstantCombinator from "../src/entities/ConstantCombinator"
import SmallLamp          from "../src/entities/SmallLamp"
import Position           from "../src/Position"
import Signal             from "../src/Signal"
import encode             from "../src/utils/encode"


const blueprint = new Blueprint("Test")

const lamp = blueprint.createEntity(id => new SmallLamp(id))
const combinator = blueprint.createEntity(id => new ConstantCombinator(id))

lamp.useColors(true)
    .setLeft(Signal.virtual("G"))
    .setComparator("≥")
    .setRight(5)

combinator.position = new Position(1, 0)
combinator.addFilter(Signal.virtual("G"), 15)

makeConnection()
    .from(combinator, "1")
    .to(lamp, "1")
    .withRedWire()

console.log(encode(blueprint))
