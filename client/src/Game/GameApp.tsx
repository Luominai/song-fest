import { useContext} from "react"
import "../css/game.css"
import { StateContext } from "../Context"
import GameGuessing from "./GameGuessing"
import GameGuessingReview from "./GameGuessingReview"
import GamePlayerSelect from "./GamePlayerSelect"
import GameRating from "./GameRating"
import GameRatingReview from "./GameRatingReview"
import GameSummary from "./GameSummary"

function GameApp() {
    const state = useContext(StateContext)

    // if the user's socket is not assigned to a Player, or the phase is -1 (choosing your name phase)
    if (state.myPlayer == null || state.phase == -1) {
        return <GamePlayerSelect/>
    }
    else if (state.phase == 0) {
        return <GameRating/>
    }
    else if (state.phase == 1) {
        return <GameRatingReview/>
    }
    else if (state.phase == 2) {
        return <GameGuessing/>
    }
    else if (state.phase == 3) {
        return <GameGuessingReview/>
    }
    else if (state.phase == 4) {
        return <GameSummary/>
    }
}

export default GameApp