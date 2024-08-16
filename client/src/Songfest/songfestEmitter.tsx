/**
 * This file contains functions for sending Songfest-related messages to the server.
 */

import { Socket } from "socket.io-client"
import {ClientSong, ClientToServerEvents, Score, ServerToClientEvents} from "../../../common"

export default function registerSongfestEmitter(socket: Socket<ServerToClientEvents, ClientToServerEvents>) {
    return {
        cancelSongfest: () => {
            socket.emit("cancelSongfest")
        },
        getSongfestStatus: () => {
            socket.emit("getSongfestStatus")
        },
        startGame: () => {
            socket.emit("startGame")
        },
        startSongfest: (settings: {
            songsPerPerson: number,
            theme: string,
            host: string
        }) => {
            socket.emit("startSongfest", settings)
        },
        submitSongs: (data: {
            playerName: string
            songData: Array<Pick<ClientSong, "url"> & Partial<Omit<ClientSong, "url">>>
        }) => {
            socket.emit("submitSongs", data)
        }
    }
}