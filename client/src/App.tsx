import { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import SongfestStatusContext from './SongfestStatusContext'
import SongfestHome from './SongfestHome'
import SongfestGame from './SongfestGame'
import SongfestClosed from './SongfestClosed'

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

    function emitSongfestOpen(state: boolean) {
        socket.emit("updateSongfestOpen", state)
    }
    function emitParticipants(state: Array<string>) {
        socket.emit("updateParticipants", state)
    }
    function emitSongs(state: Record<string,Array<string>>) {
        socket.emit("updateSongs", state)
    }
    function emitSongsPerPerson(state: number) {
        socket.emit("updateSongsPerPerson", state)
    }
    function emitTheme(state: string) {
        socket.emit("updateTheme", state)
    }
    function emitGameStart(state: boolean) {
        socket.emit("updateGameStart", state)
    }
    function emitHost(state: string) {
        socket.emit("updateHost", state)
    }

    function startGame() {
        socket.emit("startGame")
    }

    useEffect(() => {
        socket.on("connect", () => {
            const sessionId = socket.id
            console.log(sessionId)
            socket.emit("getSongfestStatus", sessionId)
        })
        socket.on("receiveSongfestStatus", (serverSongfestStatus) => {
            console.log(serverSongfestStatus)
            // update all state variables
            setSongfestOpen(serverSongfestStatus.songfestOpen)
            setParticipants(serverSongfestStatus.participants)
            setSongs(serverSongfestStatus.songs)
            setSongsPerPerson(serverSongfestStatus.songsPerPerson)
            setTheme(serverSongfestStatus.theme)
        })
        socket.on('updateSongfestOpen', (state) => {
            setSongfestOpen(state)
        })
        socket.on('updateParticipants', (state) => {
            setParticipants(state)
        })
        socket.on('updateSongs', (state) => {
            setSongs(state)
        })
        socket.on('updateSongsPerPerson', (state) => {
            setSongsPerPerson(state)
        })
        socket.on('updateTheme', (state) => {
            setTheme(state)
        })
        socket.on('updateGameStart', (state) => {
            setGameStart(state)
        })
        socket.on('updateHost', (state) => {
            setHost(state)
        })
    }, [socket])

    return (
        <>
            <SongfestStatusContext.Provider value={{
                songfestOpen: songfestOpen,
                setSongfestOpen: emitSongfestOpen,
                participants: participants,
                setParticipants: emitParticipants,
                songs: songs,
                setSongs: emitSongs,
                songsPerPerson: songsPerPerson,
                setSongsPerPerson: emitSongsPerPerson,
                theme: theme,
                setTheme: emitTheme,
                gameStart: gameStart,
                setGameStart: emitGameStart,
                host: host,
                setHost: emitHost,

                startGame: startGame
            }}>
                {gameStart ? <SongfestGame/> : <SongfestHome/>}
            </SongfestStatusContext.Provider>
        </>
    )
}

export default App
