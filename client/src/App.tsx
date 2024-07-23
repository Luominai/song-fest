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

    useEffect(() => {
        // after initial render, get the songfest status
        socket.emit("getSongfestStatus")
    }, [])

    useEffect(() => {
        socket.on("receiveSongfestStatus", (serverSongfestStatus) => {
            console.log(serverSongfestStatus)
            // update all state variables
            setSongfestOpen(serverSongfestStatus.songfestOpen)
            setParticipants(serverSongfestStatus.participants)
            setSongs(serverSongfestStatus.songs)
            setSongsPerPerson(serverSongfestStatus.songsPerPerson)
            setTheme(serverSongfestStatus.theme)
        })
    }, [socket])

    const sampleContextData = {
        songfestOpen: false,
        setSongfestOpen: setSongfestOpen,
        participants: ["test1", "test2", "test3"],
        setParticipants: setParticipants,
        songs: {
            "test1": ["rick roll"],
            "test2": ["skskksjshf"],
            "test3": ["suzume"]
        },
        setSongs: setSongs,
        songsPerPerson: 2,
        setSongsPerPerson: setSongsPerPerson
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <SongfestStatusContext.Provider value={{
                songfestOpen: songfestOpen,
                setSongfestOpen: setSongfestOpen,
                participants: participants,
                setParticipants: setParticipants,
                songs: songs,
                setSongs: setSongs,
                songsPerPerson: songsPerPerson,
                setSongsPerPerson: setSongsPerPerson,
                theme: theme,
                setTheme: setTheme
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
