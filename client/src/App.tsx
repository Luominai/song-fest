import { useState } from 'react'
import './css/App.css'
import Game from './Game'
import { io } from 'socket.io-client'
import Songfest from './Songfest'

// connect to socket server
const socket = io()

function App() {
    const [gameStart, setGameStart] = useState(false)

    if (gameStart) {
        return <Game/>
    }
    else {
        return <Songfest socket={socket} startGame={() => setGameStart(true)}/>
    }
}

export default App
