/**
 * This file contains functions for receiving Game-related messages from the server.
 */

import { Socket } from "socket.io-client"

export default function useGameReceivers(socket: Socket, gameSetters: any) {
    const {setCurrentSong, setPhase, setPlayer, setHost, setParticipants} = gameSetters

    socket.on("receiveGameState", (serverGameState) => {
        console.log(serverGameState)
        // player is not included here because the server won't know which player you are until you say so
        setCurrentSong(serverGameState.currentSong)
        setPhase(serverGameState.phase)
        setHost(serverGameState.host)
        setParticipants(serverGameState.participants)
    })
    socket.on("updatePlayer", (state) => {
        console.log(`server requesting to update Player to ${state}`)
        setPlayer(state)
    })
    socket.on("updatePhase", (state) => {
        console.log(`server requesting to update Phase to ${state}`)
        setPhase(state)
    })
    socket.on("updateCurrentSong", (state) => {
        console.log(`server requesting to update CurrentSong to ${state}`)
        setCurrentSong(state)
    })
    // not sure if these 2 will see any use but might as well have them in case they do
    socket.on("updateHost", (state) => {
        console.log(`server requesting to update Host to ${state}`)
        setHost(state)
    })
    socket.on("updateParticipants", (state) => {
        console.log(`server requesting to update Participants to ${state}`)
        setParticipants(state)
    })
}
