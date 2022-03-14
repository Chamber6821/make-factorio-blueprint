import Signal from "../Signal"


export default function createLetterSignal(char: string): Signal {
    return new Signal("virtual", `signal-${char}`)
}