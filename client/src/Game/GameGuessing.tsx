import { useContext, useEffect, useState } from "react"
import YouTube from "react-youtube"
import { StateContext } from "../Context"
import { socket } from "../Socket"
import PlayerNameCombobox from "../Components/PlayerNameCombobox"

export default function GameGuessing() {
    const [guess, setGuess] = useState<string | null>(null)
    const [time, setTime] = useState(60000)
    const [phaseOver, setPhaseOver] = useState(false)
    const [isMySong, setIsMySong] = useState(false)

    const state = useContext(StateContext)

    // if there is no currentSong, don't render
    if (!state.currentSong) {
        return
    }

    if (state?.currentSong) {
        return
    }

    // on render, check if the song was submitted by this player and start timer
    useEffect(() => {
        socket.emit("isThisMySong")
        const timerId = setInterval(() => {
            setTime(time => time - 100)
            if (time <= 0) {
                setPhaseOver(true)
                clearInterval(timerId)
            }
        }, 100)

        return () => {
            clearInterval(timerId)
        }
    }, [])
    useEffect(() => {
        socket.on("isThisYourSong", setIsMySong)
        return () => {
            socket.off("isThisYourSong", setIsMySong)
        }
    }, [socket])

    if (phaseOver) {
        return (
            <div>
                You have submitted your guess
            </div>
        )
    }

    return (
        <>
            <div>
                Guess who submitted the song {(time/1000).toString()}
            </div>

            <YouTube
            className={"youtube"}
            videoId={state?.currentSong?.videoId}
            opts={{
                playerVars: {
                    start: state?.currentSong.startSeconds,
                    end: state?.currentSong.endSeconds,
                    autoplay: 1,
                }
            }}
            />

            <PlayerNameCombobox onChange={setGuess}/>

            <div>
                <button
                className="guessSongSubmitter"
                type="button"
                disabled={isMySong}
                onClick={() => {
                    if (guess != null) {
                        // state?.emitFunctions.guessSongSubmitter({
                        //     playerName: guess,
                        //     time: time
                        // })
                        socket.emit("guessSongSubmitter", {
                            playerName: guess,
                            time: time
                        })
                        setPhaseOver(true)
                    }
                }}
                >
                    {isMySong ? "This is your song" : "Confirm"}
                </button>
            </div>
        </>
    )
}