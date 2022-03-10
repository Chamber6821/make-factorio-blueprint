import Creator from "./Creator"
import Entity  from "./entities/Entity"
import Icon    from "./Icon"
import Signal  from "./Signal"


const createIcon = (signal: Signal, index: number): Icon => new Icon(signal, index + 1)

export default class Blueprint {
    readonly entities: Entity[] = []
    readonly icons: Icon[]
    readonly item = "blueprint"

    constructor(
        readonly label: string,
        iconSignals: Signal[] = [],
        readonly version = 281479274037248
    ) {
        this.icons = iconSignals.map(createIcon)
    }

    createEntity<T extends Entity>(creator: Creator<T>): T {
        const entity = creator(this.entities.length + 1)
        this.entities.push(entity)
        return entity
    }
}