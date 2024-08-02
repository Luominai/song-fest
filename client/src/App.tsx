/**
 * This is the top level component for the entire project.
 * Contains a socket connection that is passed to Game.tsx and Songfest.tsx
 */

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
        return <Game socket={socket}/>
    }
    else {
        return <Songfest socket={socket} startGame={() => setGameStart(true)}/>
    }
}

export default App
