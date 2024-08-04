/**
 * This file contains functions for sending Songfest-related messages to the server.
 */

import { Socket } from "socket.io-client"

export default function getSongfestEmitters(socket: Socket) {
    return {
        "emitSongfestOpen": (state: boolean) => {
            console.log(`asking server to update SongfestOpen to ${state}`)
            socket.emit("updateSongfestOpen", state)
        },
        "emitParticipants": (state: Array<string>) => {
            console.log(`asking server to update Participants to ${state}`)
            socket.emit("updateParticipants", state)
        },
        "emitSongs": (state: Record<string,Array<string>>) => {
            console.log(`asking server to update Songs to ${state}`)
            socket.emit("updateSongs", state)
        },
        "emitSongsPerPerson":(state: number) => {
            console.log(`asking server to update SongsPerPerson to ${state}`)
            socket.emit("updateSongsPerPerson", state)
        },
        "emitTheme":(state: string) => {
            console.log(`asking server to update Theme to ${state}`)
            socket.emit("updateTheme", state)
        },
        "emitHost":(state: string) => {
            console.log(`asking server to update Host to ${state}`)
            socket.emit("updateHost", state)
        },
        "startGame":() => {
            console.log(`asking server to start the game`)
            socket.emit("startGame")
        },
        "getSongfestStatus":() => {
            console.log('asking server for songfest status')
            socket.emit("getSongfestStatus")
        }
    }
}