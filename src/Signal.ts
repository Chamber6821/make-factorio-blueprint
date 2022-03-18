type Letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K"
    | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X"
    | "Y" | "Z"

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

type Color = "red" | "green" | "blue" | "yellow" | "pink" | "cyan" | "white" | "grey" | "black"

type Special = "check" | "info" | "dot"

export default class Signal {
    static virtual(postName: Letter | Digit | Color | Special) {
        return new Signal("virtual", `signal-${postName}`)
    }

    constructor(
        readonly type: "item" | "fluid" | "virtual",
        readonly name: string
    ) {}
}