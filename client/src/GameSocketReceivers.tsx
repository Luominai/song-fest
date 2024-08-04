/**
 * This file contains functions for receiving Game-related messages from the server.
 */

import { Socket } from "socket.io-client"

export default function useGameReceivers(socket: Socket, gameSetters: any) {
    const {setCurrentSong, setPhase, setPlayer} = gameSetters

    socket.on("connect", () => {
        const sessionId = socket.id
        console.log(sessionId)
        console.log("game socket connect")
        socket.emit("getGameStatus", sessionId)
    })
    // need to add a receiver on server end for this
    socket.on("receiveGameStatus", (gameStatus) => {
        setCurrentSong(gameStatus.currentSong)
        setPhase(gameStatus.phase)
    })
}
