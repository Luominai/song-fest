import { useContext } from "react"
import GameContext from "./GameContext"

export default function GameGuessingReview() {
    const gameState = useContext(GameContext)
    const currentSong = gameState?.state?.currentSong
    const guessDistribution = currentSong?.guessDistribution

    if (!guessDistribution) {
        return
    }

    return (
        <>
            <h3>Guessing Summary</h3>
            <div style={{height: 600, width:200, overflow: "scroll"}}>
                {Object.entries(guessDistribution).map(([name, guessCount]) => {
                    return (
                        <div style={{width: "100%"}}>
                            {name}: {guessCount}
                        </div>
                    )
                })}
            </div>
            <button
            type="button"
            onClick={() => {
                gameState?.emitFunctions.nextPhase()
            }}
            >
                next
            </button>
        </>
    )
}