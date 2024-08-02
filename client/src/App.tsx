import { useEffect, useState } from 'react'
import './App.css'
import SongfestStatusContext from './SongfestStatusContext'
import SongfestHome from './Songfest'
import Game from './Game'
import { getSongfestEmitters, useSongfestReceivers } from './SongfestSockets'
import { io, Socket } from 'socket.io-client'
import Songfest from './Songfest'

// connect to socket server
const socket = io()

function App() {
    const [gameInProgress, setGameInProgress] = useState(false)

    if (gameInProgress) {
        return <Game/>
    }
    else {
        return <Songfest socket={socket}/>
    }
}

export default App
