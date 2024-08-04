/**
 * This is the top-level for all Songfest components.
 * Contains all the state variables for the Home Menu.
 * Shares all state variables and their setters to all Songfest components using SongfestStatusContext.tsx
 * Handles sockets relating to the Home Menu.
 * 
 * @param socket        A socket connection passed in from App.tsx to ensure the same socket connection is used throughout the project
 * @param startGame     A function passed in from App.tsx that starts the game when called. Ex: startGame()   
 */

import { useContext, useState, useEffect, useRef } from "react"
import SongfestStatusContext from "./SongfestStatusContext"
import SongfestOpen from "./SongfestOpen"
import SongfestClosed from "./SongfestClosed"
import getSongfestEmitters from "./SongfestSocketEmitters"
import useSongfestReceivers from "./SongfestSocketReceivers"
import { Socket } from "socket.io-client"

function Songfest({socket, startGame}: {socket: Socket, startGame: Function}) {
    const songfestStatusReceived = useRef(false)

    // songfest variables
    const [songfestOpen, setSongfestOpen] = useState(false)
    const [participants, setParticipants] = useState([])
    const [songs, setSongs] = useState({})
    const [songsPerPerson, setSongsPerPerson] = useState(1)
    const [theme, setTheme] = useState("")
    const [host, setHost] = useState("")

    const songfestEmitters = getSongfestEmitters(socket)

    useEffect(() => {
        // this function handles messages from the server
        // setter functions are passed in so the functions can actually change the state locally
        useSongfestReceivers(socket, {
            "setSongfestOpen":setSongfestOpen, 
            "setParticipants":setParticipants, 
            "setSongs":setSongs, 
            "setSongsPerPerson":setSongsPerPerson, 
            "setTheme":setTheme, 
            "setHost":setHost
        })
        if (!songfestStatusReceived.current) {
            console.log(socket.id)
            songfestEmitters.getSongfestStatus()
            songfestStatusReceived.current = true
        }
    }, [socket])

    return (
        <>
            <SongfestStatusContext.Provider value={{
                songfestOpen: songfestOpen,
                setSongfestOpen: songfestEmitters.emitSongfestOpen,
                participants: participants,
                setParticipants: songfestEmitters.emitParticipants,
                songs: songs,
                setSongs: songfestEmitters.emitSongs,
                songsPerPerson: songsPerPerson,
                setSongsPerPerson: songfestEmitters.emitSongsPerPerson,
                theme: theme,
                setTheme: songfestEmitters.emitTheme,
                host: host,
                setHost: songfestEmitters.emitHost,

                startGame: startGame
            }}>
                {songfestOpen ? <SongfestOpen/> : <SongfestClosed />}
            </SongfestStatusContext.Provider>
        </>
    )
}

export default Songfest