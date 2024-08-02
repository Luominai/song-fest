import { useContext, useState, useEffect } from "react"
import SongfestStatusContext from "./SongfestStatusContext"
import SongfestOpen from "./SongfestOpen"
import SongfestClosed from "./SongfestClosed"
import getSongfestEmitters from "./SongfestSocketEmitters"
import useSongfestReceivers from "./SongfestSocketReceivers"
import { Socket } from "socket.io-client"

function Songfest({socket, startGame}: {socket: Socket, startGame: Function}) {
    // songfest variables
    const [songfestOpen, setSongfestOpen] = useState(false)
    const [participants, setParticipants] = useState([])
    const [songs, setSongs] = useState({})
    const [songsPerPerson, setSongsPerPerson] = useState(1)
    const [theme, setTheme] = useState("")
    const [host, setHost] = useState("")

    const songfestEmitters = getSongfestEmitters(socket)

    useEffect(() => {
        useSongfestReceivers(socket, {
            "setSongfestOpen":setSongfestOpen, 
            "setParticipants":setParticipants, 
            "setSongs":setSongs, 
            "setSongsPerPerson":setSongsPerPerson, 
            "setTheme":setTheme, 
            "setHost":setHost
        })
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