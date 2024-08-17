import { useContext } from "react"
import GameContext from "./GameContext"

export default function GameRatingReview() {
    const gameState = useContext(GameContext)
    const currentSong = gameState?.state?.currentSong
    const themeDistribution = currentSong?.themeScore
    const likedDistribution = currentSong?.likedScore

    if (!themeDistribution || !likedDistribution) {
        return
    }

    return (
        <>
            <h3>Rating Summary</h3>
            <div style={{height: 200, width:400, display: "flex"}}>
                <span style={{width:"33.33%", height: `${themeDistribution.low / themeDistribution.total * 100}%`, backgroundColor: "red"}}>
                    low
                </span>
                <span style={{width:"33.33%", height: `${themeDistribution.mid / themeDistribution.total * 100}%`, backgroundColor: "yellow"}}>
                    mid
                </span>
                <span style={{width:"33.33%", height: `${themeDistribution.high / themeDistribution.total * 100}%`, backgroundColor: "green"}}>
                    high
                </span>
            </div>
            <div style={{height: 200, width:400, display: "flex"}}>
                <span style={{width:"33.33%", height: `${likedDistribution.low / likedDistribution.total * 100}%`, backgroundColor: "red"}}>
                    low
                </span>
                <span style={{width:"33.33%", height: `${likedDistribution.mid / likedDistribution.total * 100}%`, backgroundColor: "yellow"}}>
                    mid
                </span>
                <span style={{width:"33.33%", height: `${likedDistribution.high / likedDistribution.total * 100}%`, backgroundColor: "green"}}>
                    high
                </span>
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