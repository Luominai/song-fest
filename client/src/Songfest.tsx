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
import ClientSongfest from "./types/ClientSongfest"
import { SongfestContext, SongfestContextDefault } from "./SongfestContext"
import registerSongfestEmitter from "./songfestEmitter"
import registerSongfestHandler from "./songfestHandler"

function Songfest({socket}: {socket: Socket}) {
    const songfestStatusReceived = useRef(false)
    const [songfestStatus, setSongfestStatus] = useState<ClientSongfest>(SongfestContextDefault.state)

    const songfestEmitters = registerSongfestEmitter(socket)

    useEffect(() => {
        // this function handles messages from the server
        // setter functions are passed in so the functions can actually change the state locally
        registerSongfestHandler(socket, setSongfestStatus)

        // one-time get songfestStatus from server on connect
        if (!songfestStatusReceived.current) {
            songfestEmitters.getSongfestStatus()
            songfestStatusReceived.current = true
        }
    }, [socket])

    return (
        <>
            <SongfestContext.Provider value={{
                state: songfestStatus,
                emitFunctions: songfestEmitters
            }}>
                {songfestStatus.songfestOpen ? <SongfestOpen/> : <SongfestClosed />}
            </SongfestContext.Provider>
        </>
    )
}

export default Songfest