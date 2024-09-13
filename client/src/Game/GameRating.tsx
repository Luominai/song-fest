import { useContext, useEffect, useState } from "react"
import YouTube from "react-youtube"
import { Score, Song } from "../../../common"
import { StateContext } from "../Context"
import { socket } from "../Socket"

export default function GameRating() {
    const [likedScore, setLikedScore] = useState<Score| null>(null)
    const [themeScore, setThemeScore] = useState<Score| null>(null)
    const [time, setTime] = useState(5000)
    const [timer, setTimer] = useState<any>(null)
    const [phaseOver, setPhaseOver] = useState(false)
    const [isMySong, setIsMySong] = useState(false)

    const state = useContext(StateContext)

    // if there is no currentSong, don't render
    if (!state.currentSong) {
        return
    }
    
    // on render, check if the song was submitted by this player
    useEffect(() => {
        socket.emit("isThisMySong")
    }, [])
    useEffect(() => {
        socket.on("isThisYourSong", setIsMySong)
        return () => {
            socket.off("isThisYourSong", setIsMySong)
        }
    }, [socket])
    useEffect(() => {
        if (time <= 0) {
            setPhaseOver(true)
            clearInterval(timer)
            setPhaseOver(true)
            socket.emit("rateSong", {
                liked: {low: 0, mid: 0, high: 0, total: 0},
                theme: {low: 0, mid: 0, high: 0, total: 0}
            })
            if (timer != null) {
                clearInterval(timer)
            }
            
        }
    })

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
                Rate the song {(time/1000).toString()}
            </div>

            <YouTube
            className={"youtube"}
            videoId={state.currentSong.videoId}
            opts={{
                playerVars: {
                    start: state.currentSong.startSeconds,
                    end: state.currentSong.endSeconds,
                    autoplay: 1,
                }
            }}
            onPlay={() => {
                const timerId = setInterval(() => {
                    setTime(time => time - 100)
                }, 100)
                setTimer(timerId)
            }}
            />

            <div>
                <h3>
                    How much do you like it?
                </h3>
                <button 
                className="likedLow"
                type="button"
                onClick={() => {
                    setLikedScore({low: 1, mid: 0, high: 0, total: 1})
                }}
                >
                    low
                </button>
                <button
                className="likedMid"
                type="button"
                onClick={() => {
                    setLikedScore({low: 0, mid: 1, high: 0, total: 1})
                }}
                >
                    mid
                </button>
                <button
                className="likedHigh"
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
                className="themeLow"
                type="button"
                onClick={() => {
                    setThemeScore({low: 1, mid: 0, high: 0, total: 1})
                }}
                >
                    low
                </button>
                <button
                className="themeMid"
                type="button"
                onClick={() => {
                    setThemeScore({low: 0, mid: 1, high: 0, total: 1})
                }}
                >
                    mid
                </button>
                <button
                className="themeHigh"
                type="button"
                onClick={() => {
                    setThemeScore({low: 0, mid: 0, high: 1, total: 1})
                }}
                >
                    high
                </button>
            </div>

            <button
            className="rateSong"
            type="button"
            disabled={isMySong || !likedScore || !themeScore}
            onClick={() => {
                if (likedScore && themeScore) {
                    socket.emit("rateSong", {
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
                {isMySong ? "This is your song" : "Confirm"}
            </button>
        </>
    )
}