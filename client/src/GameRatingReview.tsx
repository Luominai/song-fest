import { useContext } from "react"
import GameContext from "./GameContext"

interface Score {
    "low": number,
    "mid": number,
    "high": number,
    "sum": number
}

export default function GameRatingReview({likedDistribution, themeDistribution}: {likedDistribution: Score, themeDistribution: Score}) {
    const gameState = useContext(GameContext)

    return (
        <>
            <h3>Rating Summary</h3>
            <div style={{height: 200, width:400, display: "flex"}}>
                <span style={{width:"33.33%", height: `${themeDistribution.low / themeDistribution.sum * 100}%`, backgroundColor: "red"}}>
                    low
                </span>
                <span style={{width:"33.33%", height: `${themeDistribution.mid / themeDistribution.sum * 100}%`, backgroundColor: "yellow"}}>
                    mid
                </span>
                <span style={{width:"33.33%", height: `${themeDistribution.high / themeDistribution.sum * 100}%`, backgroundColor: "green"}}>
                    high
                </span>
            </div>
            <div style={{height: 200, width:400, display: "flex"}}>
                <span style={{width:"33.33%", height: `${likedDistribution.high / likedDistribution.sum * 100}%`, backgroundColor: "red"}}>
                    low
                </span>
                <span style={{width:"33.33%", height: `${likedDistribution.high / likedDistribution.sum * 100}%`, backgroundColor: "yellow"}}>
                    mid
                </span>
                <span style={{width:"33.33%", height: `${likedDistribution.high / likedDistribution.sum * 100}%`, backgroundColor: "green"}}>
                    high
                </span>
            </div>
            <button
            type="button"
            onClick={() => {
                gameState.setPhase(2)
            }}
            >
                next
            </button>
        </>
    )
}