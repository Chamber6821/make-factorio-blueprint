import * as zlib from "zlib"
import Blueprint from "../Blueprint"


export default function encode(blueprint: Blueprint) {
    const json = JSON.stringify({ blueprint })
    return "0" + zlib.deflateSync(json)
        .toString("base64")
}
