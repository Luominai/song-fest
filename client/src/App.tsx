/**
 * This is the top level component for the entire project.
 * Contains a socket connection that is passed to Game.tsx and Songfest.tsx
 */

import { useEffect, useRef, useState } from 'react'
import './css/App.css'
import Game from './Game'
import { io } from 'socket.io-client'
import Songfest from './Songfest'

// connect to socket server
const socket = io()

function App() {
    const [socketConnected, setSocketConnected] = useState(false)
    const [gameStart, setGameStart] = useState(false)

    useEffect(() => {
        socket.on("connect", () => {
            setSocketConnected(true)
            console.log(socket.id)
        })
    },[])

    if (socketConnected) {
        if (gameStart) {
            return <Game socket={socket}/>
        }
        else {
            return <Songfest socket={socket} startGame={() => setGameStart(true)}/>
        }
    }
    else return (
        <div>
            loading...
        </div>
    )
}

export default App
