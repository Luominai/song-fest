/**
 * This file contains functions for sending Game-related messages to the server.
 */

import { Socket } from "socket.io-client"

export default function getGameEmitters(socket: Socket) {
    return {
        "getGameState":() => {
            console.log("asking server for game state")
            socket.emit("getGameState")
        },
        // this should only work if you are the host. do a serverside check
        "emitPhase":(state: number) => {
            const phases = ["rating", "rating review", "guessing", "guessing review"]
            console.log(`asking server to change phase to ${state}: ${phases[state]}`)
            socket.emit("updatePhase", state)
        },
        "emitPlayer":(state: string) => {
            console.log(`asking server to register ${socket.id} as ${state}`)
            socket.emit("updatePlayer", state)
        },
    }
}