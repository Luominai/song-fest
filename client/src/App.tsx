import { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import SongfestStatusContext from './SongfestStatusContext'
import SongfestHome from './SongfestHome'
import Game from './Game'
import SongfestClosed from './SongfestClosed'
import { getSongfestEmitters, useSongfestReceivers } from './SongfestSockets'

// connect to socket server
const socket = io()

function App() {
    const [songfestOpen, setSongfestOpen] = useState(false)
    const [participants, setParticipants] = useState([])
    const [songs, setSongs] = useState({})
    const [songsPerPerson, setSongsPerPerson] = useState(1)
    const [theme, setTheme] = useState("")
    const [gameStart, setGameStart] = useState(false)
    const [host, setHost] = useState("")

    const songfestEmitters = getSongfestEmitters(socket)

    useEffect(() => {
        useSongfestReceivers(socket, {
            "setSongfestOpen":setSongfestOpen, 
            "setParticipants":setParticipants, 
            "setSongs":setSongs, 
            "setSongsPerPerson":setSongsPerPerson, 
            "setTheme":setTheme, 
            "setGameStart":setGameStart, 
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
                gameStart: gameStart,
                setGameStart: songfestEmitters.emitGameStart,
                host: host,
                setHost: songfestEmitters.emitHost,

                startGame: songfestEmitters.startGame
            }}>
                {gameStart ? <Game/> : <SongfestHome/>}
            </SongfestStatusContext.Provider>
        </>
    )
}

export default App
