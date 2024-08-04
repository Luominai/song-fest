/**
 * This is the top-level for all Game components.
 * Contains all the state variables for the Game.
 * Shares all state variables and their setters to all Game components using GameContext.tsx
 * Handles sockets relating to the Game.
 * 
 * @param socket        A socket connection passed in from App.tsx to ensure the same socket connection is used throughout the project
 */

import { useEffect, useRef, useState } from "react"
import "./css/game.css"
import GameRating from "./GameRating"
import GameRatingReview from "./GameRatingReview"
import GameGuessing from "./GameGuessing"
import GameGuessingReview from "./GameGuessingReview"
import GamePlayerSelect from "./GameSelect"
import Song from "./types/Song"
import GameContext from "./GameContext"
import { Socket } from "socket.io-client"
import getGameEmitters from "./GameSocketEmitters"
import useGameReceivers from "./GameSocketReceivers"

function Game({socket}: {socket: Socket}) {
    const gameStateReceived = useRef(false)

    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [phase, setPhase] = useState<number>(0)
    const [player, setPlayer] = useState<string | null>(null)

    const gameEmitters = getGameEmitters(socket)

    useEffect(() => {
        // use the receivers
        useGameReceivers(socket, {
            "setCurrentSong":setCurrentSong,
            "setPhase":setPhase,
            "setPlayer":setPlayer
        })
        if (!gameStateReceived) {
            gameEmitters
        }
    }, [socket])

    if (player == null) {
        return <GamePlayerSelect/>
    }
    else if (phase == 0) {
        return <GameRating/>
    }
    else if (phase == 1) {
        return <GameRatingReview/>
    }
    else if (phase == 2) {
        return <GameGuessing/>
    }
    else if (phase == 3) {
        return <GameGuessingReview/>
    }
}

export default Game