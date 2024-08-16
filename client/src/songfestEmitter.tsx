/**
 * This file contains functions for sending Songfest-related messages to the server.
 */

import { Socket } from "socket.io-client"
import ClientToServerEvents from "./types/ClientToServerEvents"
import ServerToClientEvents from "./types/ServerToClientEvents"
import Score from "./types/Score"
import ClientSong from "./types/ClientSong"

export default function registerSongfestEmitter(socket: Socket<ServerToClientEvents, ClientToServerEvents>) {
    return {
        cancelSongfest: () => {
            socket.emit("cancelSongfest")
        },
        getSongfestStatus: () => {
            socket.emit("getSongfestStatus")
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