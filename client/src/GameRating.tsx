import { useContext, useState } from "react"
import YouTube from "react-youtube"
import GameContext from "./GameContext"

interface Song {
    "videoId": string,
    "startSeconds": number,
    "endSeconds": number,
    "clipId": string,
    "submitter": string
}

const defaultSong = {
    "videoId": "A8DI6DF4r3Q",
    "startSeconds": 50,
    "endSeconds": 70,
    "clipId": "N/A",
    "submitter": "test"
}

export default function GameRating({currentSong}: {currentSong: Song}) {
    const [likedScore, setLikedScore] = useState<string| null>(null)
    const [themeScore, setThemeScore] = useState<string| null>(null)
    const [time, setTime] = useState(60000)
    const [timer, setTimer] = useState<number | null>(null)
    const [phaseOver, setPhaseOver] = useState(false)

    const gameState = useContext(GameContext)
    console.log("currently playing", currentSong)

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
            videoId={currentSong.videoId}
            opts={{
                playerVars: {
                    start: currentSong.startSeconds,
                    end: currentSong.endSeconds,
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
                    setLikedScore("low")
                }}
                >
                    low
                </button>
                <button
                type="button"
                onClick={() => {
                    setLikedScore("mid")
                }}
                >
                    mid
                </button>
                <button
                type="button"
                onClick={() => {
                    setLikedScore("high")
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
                    setThemeScore("low")
                }}
                >
                    low
                </button>
                <button
                type="button"
                onClick={() => {
                    setThemeScore("mid")
                }}
                >
                    mid
                </button>
                <button
                type="button"
                onClick={() => {
                    setThemeScore("high")
                }}
                >
                    high
                </button>
            </div>

            <button
            type="button"
            onClick={() => {
                gameState.rate({
                    "liked": likedScore,
                    "theme": themeScore
                })
                setPhaseOver(true)
                if (timer != null) {
                    clearInterval(timer)
                }
            }}
            >
                Confirm
            </button>
        </>
    )
}