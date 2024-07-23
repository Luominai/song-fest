import { useContext, useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import SongfestClosed from './SongfestClosed'
import SongfestOpen from './SongfestOpen'
import SongfestStatusContext from './SongfestStatusContext'
import SongfestCreationPopup from './SongfestCreationPopup'
import SongfestSubmissionPopup from './SongfestSubmissionPopup'

// connect to socket server
const socket = io()

function App() {
    const [songfestOpen, setSongfestOpen] = useState(false)
    const [participants, setParticipants] = useState([])
    const [songs, setSongs] = useState({})
    const [songsPerPerson, setSongsPerPerson] = useState(1)
    const [theme, setTheme] = useState("")

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
    }, [socket])

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
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
                setTheme: emitTheme
            }}>
            {/* <SongfestStatusContext.Provider value={sampleContextData}> */}
                <SongfestCreationPopup/>
                {songfestOpen ? <SongfestOpen/> : <SongfestClosed/>}
                <SongfestSubmissionPopup/>
            </SongfestStatusContext.Provider>
        </>
    )
}

export default App
