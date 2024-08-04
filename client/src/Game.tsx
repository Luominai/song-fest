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
    // when playing the game, the only thing you'd need to change on the server is the phase and who you are playing as
    const [phase, setPhase] = useState<number>(0)
    const [player, setPlayer] = useState<string | null>(null)

    // these state variables do not have a corresponding emit function. these only change locally
    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [participants, setParticipants] = useState([])
    const [host, setHost] = useState<string | null>(null)

    const gameEmitters = getGameEmitters(socket)

    useEffect(() => {
        // use the receivers
        useGameReceivers(socket, {
            "setCurrentSong":setCurrentSong,
            "setPhase":setPhase,
            "setPlayer":setPlayer,
            "setHost":setHost,
            "setParticipants":setParticipants
        })
        if (!gameStateReceived.current) {
            gameEmitters.getGameState()
            gameStateReceived.current = true
        }
    }, [socket])

    let renderedComponent

    if (player == null) {
        renderedComponent = <GamePlayerSelect/>
    }
    else if (phase == 0) {
        renderedComponent = <GameRating/>
    }
    else if (phase == 1) {
        renderedComponent = <GameRatingReview/>
    }
    else if (phase == 2) {
        renderedComponent = <GameGuessing/>
    }
    else if (phase == 3) {
        renderedComponent = <GameGuessingReview/>
    }

    return (
        <GameContext.Provider value={{
            player: player,
            setPlayer: gameEmitters.emitPlayer,
            phase: phase,
            setPhase: gameEmitters.emitPhase,

            currentSong: currentSong,
            setCurrentSong: setCurrentSong,
            participants: participants,
            setParticipants: setParticipants,
            host: host,
            setHost: setHost
        }}
        >
            {renderedComponent}
        </GameContext.Provider>
    )
}

export default Game