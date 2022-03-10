export default class Signal {
    constructor(
        readonly type: "item" | "fluid" | "virtual",
        readonly name: string
    ) {}
}