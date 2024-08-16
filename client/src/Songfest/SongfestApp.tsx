/**
 * This is the top-level for all Songfest components.
 * Contains all the state variables for the Home Menu.
 * Shares all state variables and their setters to all Songfest components using SongfestStatusContext.tsx
 * Handles sockets relating to the Home Menu.
 * 
 * @param socket        A socket connection passed in from App.tsx to ensure the same socket connection is used throughout the project
 * @param startGame     A function passed in from App.tsx that starts the game when called. Ex: startGame()   
 */

import { useState, useEffect, useRef } from "react"
import SongfestOpen from "./SongfestOpen"
import SongfestClosed from "./SongfestClosed"
import { Socket } from "socket.io-client"
import {ClientSongfest} from "../../../common"
import SongfestContext from "./SongfestContext"
import registerSongfestEmitter from "./songfestEmitter"
import registerSongfestHandler from "./songfestHandler"

function SongfestApp({socket}: {socket: Socket}) {
    const songfestStatusReceived = useRef(false)
    const [songfestStatus, setSongfestStatus] = useState<ClientSongfest | null>(null)
    const [songsProcessed, setSongsProcessed] = useState(true)

    const songfestEmitters = registerSongfestEmitter(socket)

    useEffect(() => {
        // handle all messages relating to setting SongfestStatus
        registerSongfestHandler(socket, setSongfestStatus)

        // one-time get songfestStatus from server on connect
        if (!songfestStatusReceived.current) {
            songfestEmitters.getSongfestStatus()
            songfestStatusReceived.current = true
        }
    }, [socket])

    // useEffect specifically for feedback on song submission
    useEffect(() => {
        socket.on("startProcessingSongs", () => {
            setSongsProcessed(false)
        })
        socket.on("endProcessingSongs", () => {
            setSongsProcessed(true)
        })
    }, [socket])

    if (songfestStatus == null) {
        return
    }

    console.log(songfestStatus.songfestOpen)

    return (
        <>
            <SongfestContext.Provider value={{
                state: songfestStatus,
                emitFunctions: songfestEmitters,
                songsProcessed: songsProcessed
            }}>
                {songfestStatus.songfestOpen ? <SongfestOpen/> : <SongfestClosed />}
            </SongfestContext.Provider>
        </>
    )
}

export default SongfestApp