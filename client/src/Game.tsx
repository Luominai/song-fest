import { useState } from "react"
import "./game.css"
import GameRatingPhase from "./GameRatingPhase"
import Song from "./Song"
import GameContext from "./GameContext"

function Game() {
    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [phase, setPhase] = useState<number>(0)

    if (phase == 0) {
        return <GameRatingPhase/>
    }
    // else if (phase == 1) {
    //     return <GameRatingReviewPhase/>
    // }
    // else if (phase == 2) {
    //     return <GameGuessingPhase/>
    // }
    // else if (phase == 3) {
    //     return <GameGuessingReviewPhase/>
    // }
}

export default Game