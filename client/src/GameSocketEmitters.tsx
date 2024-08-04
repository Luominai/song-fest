/**
 * This file contains functions for sending Game-related messages to the server.
 */

import { Socket } from "socket.io-client"

export default function getGameEmitters(socket: Socket) {
    return {
        "getGameState":() => {
            socket.emit("getGameState", socket.id)
        }
    }
}