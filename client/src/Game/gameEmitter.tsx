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
        guessSongSubmitter: (guess: {playerName: string, time: number}) => {
            socket.emit("guessSongSubmitter", guess)
        },
        nextPhase: () => {
            socket.emit("nextPhase")
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