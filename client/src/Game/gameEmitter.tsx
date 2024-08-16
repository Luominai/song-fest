/**
 * This file contains functions for sending Game-related messages to the server.
 */

import { Socket } from "socket.io-client"
import { ClientToServerEvents, Score, ServerToClientEvents } from "../../../common"

export default function registerGameEmitter(socket: Socket<ServerToClientEvents, ClientToServerEvents>) {
    return {
        getGameStatus: () => {
            socket.emit("getGameStatus")
        },
        guessSongSubmitter: (playerName: string) => {
            socket.emit("guessSongSubmitter", playerName)
        },
        nextPhase: () => {
            socket.emit("nextPhase")
        },
        nextSong: () => {
            socket.emit("nextSong")
        },
        rateSong: (score: {
            liked: Score
            theme: Score
        }) => {
            socket.emit("rateSong", score)
        },
        registerSocketToPlayer: (playerName: string) => {
            socket.emit("registerSocketToPlayer", playerName)
        },
    }
}