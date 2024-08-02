/**
 * This is the top-level for all Game components.
 * Contains all the state variables for the Game.
 * Shares all state variables and their setters to all Game components using GameContext.tsx
 * Handles sockets relating to the Game.
 * 
 * @param socket        A socket connection passed in from App.tsx to ensure the same socket connection is used throughout the project
 */

import { useState } from "react"
import "./css/game.css"
import GameRating from "./GameRating"
import GameRatingReview from "./GameRatingReview"
import GameGuessing from "./GameGuessing"
import GameGuessingReview from "./GameGuessingReview"
import Song from "./types/Song"
import GameContext from "./GameContext"
import { Socket } from "socket.io-client"

function Game({socket}: {socket: Socket}) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [phase, setPhase] = useState<number>(0)

    if (phase == 0) {
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