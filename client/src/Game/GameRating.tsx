import { useContext, useState } from "react"
import YouTube from "react-youtube"
import GameContext from "./GameContext"
import { Score, Song } from "../../../common"

export default function GameRating() {
    const [likedScore, setLikedScore] = useState<Score| null>(null)
    const [themeScore, setThemeScore] = useState<Score| null>(null)
    const [time, setTime] = useState(60000)
    const [timer, setTimer] = useState<number | null>(null)
    const [phaseOver, setPhaseOver] = useState(false)

    const gameState = useContext(GameContext)
    console.log("currently playing", gameState?.state?.currentSong)

    if (phaseOver) {
        return (
            <div>
                You have submitted your rating
            </div>
        )
    }
    return (
        <>
            <div>
                Rate the song
            </div>

            <YouTube
            className={"youtube"}
            videoId={gameState?.state?.currentSong.videoId}
            opts={{
                playerVars: {
                    start: gameState?.state?.currentSong.startSeconds,
                    end: gameState?.state?.currentSong.endSeconds,
                    autoplay: 1,
                }
            }}
            onPlay={() => {
                const timerId = setInterval(() => {
                    setTime(time - 100)
                    if (time <= 0) {
                        setPhaseOver(true)
                        clearInterval(timerId)
                    }
                }, 100)
                setTimer(timerId)
            }}
            />

            <div>
                <h3>
                    How much do you like it?
                </h3>
                <button 
                type="button"
                onClick={() => {
                    setLikedScore({low: 1, mid: 0, high: 0, total: 1})
                }}
                >
                    low
                </button>
                <button
                type="button"
                onClick={() => {
                    setLikedScore({low: 0, mid: 1, high: 0, total: 1})
                }}
                >
                    mid
                </button>
                <button
                type="button"
                onClick={() => {
                    setLikedScore({low: 0, mid: 0, high: 1, total: 1})
                }}
                >
                    high
                </button>
            </div>

            <div>
                <h3>
                    How much does it fit the theme?
                </h3>
                <button 
                type="button"
                onClick={() => {
                    setThemeScore({low: 1, mid: 0, high: 0, total: 1})
                }}
                >
                    low
                </button>
                <button
                type="button"
                onClick={() => {
                    setThemeScore({low: 0, mid: 1, high: 0, total: 1})
                }}
                >
                    mid
                </button>
                <button
                type="button"
                onClick={() => {
                    setThemeScore({low: 0, mid: 0, high: 1, total: 1})
                }}
                >
                    high
                </button>
            </div>

            <button
            type="button"
            disabled={gameState?.myPlayer?.name == gameState?.state?.currentSong.submitterName}
            onClick={() => {
                if (likedScore && themeScore) {
                    gameState?.emitFunctions.rateSong({
                        liked: likedScore,
                        theme: themeScore
                    })
                    setPhaseOver(true)
                    if (timer != null) {
                        clearInterval(timer)
                    }
                }
            }}
            >
                Confirm
            </button>
        </>
    )
}