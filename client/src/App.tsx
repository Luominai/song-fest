/**
 * This is the top level component for the entire project.
 * Contains a socket connection that is passed to Game.tsx and Songfest.tsx
 */

import { useEffect, useRef, useState } from 'react'
import './css/App.css'
import GameApp from './GameApp'
import { io, Socket } from 'socket.io-client'
import SongfestApp from './SongfestApp'
import {ClientToServerEvents, ServerToClientEvents} from "../../common"

// connect to socket server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

function App() {
    const [socketConnected, setSocketConnected] = useState(false)
    const [gameStart, setGameStart] = useState(false)

    useEffect(() => {
        socket.on("connect", () => {
            setSocketConnected(true)
            console.log(socket.id)
        })
        socket.on("startGame", () => {
            setGameStart(true)
        })
    },[socket])

    if (socketConnected) {
        if (gameStart) {
            return <GameApp socket={socket}/>
        }
        else {
            return <SongfestApp socket={socket}/>
        }
    }
    else return (
        <div>
            loading...
        </div>
    )
}

export default App
