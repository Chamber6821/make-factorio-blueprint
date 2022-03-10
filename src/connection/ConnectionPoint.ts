import ConnectionData from "./ConnectionData"


export default class ConnectionPoint {
    constructor(
        readonly red: ConnectionData[] = [],
        readonly green: ConnectionData[] = []
    ) {}
}