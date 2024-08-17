/**
 * This is the top-level for all Game components.
 * Contains all the state variables for the Game.
 * Shares all state variables and their setters to all Game components using GameContext.tsx
 * Handles sockets relating to the Game.
 * 
 * @param socket        A socket connection passed in from App.tsx to ensure the same socket connection is used throughout the project
 */

import { useEffect, useRef, useState } from "react"
import "../css/game.css"
import GameRating from "./GameRating"
import GameRatingReview from "./GameRatingReview"
import GameGuessing from "./GameGuessing"
import GameGuessingReview from "./GameGuessingReview"
import GamePlayerSelect from "./GamePlayerSelect"
import GameContext from "./GameContext"
import { Socket } from "socket.io-client"
import registerGameEmitter from "./gameEmitter"
import registerGameHandler from "./gameHandler"
import { ClientGame, Player, Song } from "../../../common"
import GameSummary from "./GameSummary"

function GameApp({socket}: {socket: Socket}) {
    const gameStateReceived = useRef(false)
    const [gameStatus, setGameStatus] = useState<ClientGame | null>(null)
    const [myPlayer, setMyPlayer] = useState<Player | null>(null)

    const gameEmitters = registerGameEmitter(socket)

    useEffect(() => {
        // use the receivers
        registerGameHandler(socket, setGameStatus)
        if (!gameStateReceived.current) {
            gameEmitters.getGameStatus()
            gameStateReceived.current = true
        }
    }, [socket])

    // useEffect specifically for the client to know which player they are playing as
    useEffect(() => {
        const playerWithMySocket = gameStatus?.players.find((entry) => entry.socketId == socket.id)
        if (playerWithMySocket != null) {
            setMyPlayer(playerWithMySocket)
        }
    }, [gameStatus?.players])

    let renderedComponent

    // if the user's socket is not assigned to a Player, or the phase is -1 (choosing your name phase)
    if (myPlayer == null || gameStatus?.phase == -1) {
        renderedComponent = <GamePlayerSelect/>
    }
    else if (gameStatus?.phase == 0) {
        renderedComponent = <GameRating/>
    }
    else if (gameStatus?.phase == 1) {
        renderedComponent = <GameRatingReview/>
    }
    else if (gameStatus?.phase == 2) {
        renderedComponent = <GameGuessing/>
    }
    else if (gameStatus?.phase == 3) {
        renderedComponent = <GameGuessingReview/>
    }
    else if (gameStatus?.phase == 4) {
        renderedComponent = <GameSummary/>
    }

    return (
        <GameContext.Provider value={{
            state: gameStatus,
            emitFunctions: gameEmitters,
            myPlayer: myPlayer
        }}
        >
            {renderedComponent}
        </GameContext.Provider>
    )
}

export default GameApp