import { useState } from "react"
import "./css/game.css"
import GameRating from "./GameRating"
import GameRatingReview from "./GameRatingReview"
import GameGuessing from "./GameGuessing"
import GameGuessingReview from "./GameGuessingReview"
import Song from "./types/Song"
import GameContext from "./GameContext"

function Game() {
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