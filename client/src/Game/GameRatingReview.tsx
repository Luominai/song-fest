import { useEffect, useState } from "react"
import { socket } from "../Socket"
import { Score } from "../../../common"

export default function GameRatingReview() {
    const [distributions, setDistributions] = useState<{liked: Score, theme: Score} | null>(null)

    // on render, fetch the score distribution from the server
    useEffect(() => {
        socket.emit("getDistributions", "rating")
    }, [])
    useEffect(() => {
        socket.on("updateDistributions", setDistributions)
        return () => {
            socket.off("updateDistributions", setDistributions)
        }
    }, [socket])

    if (!distributions) {
        return
    }

    return (
        <>
            <h3>Rating Summary</h3>
            <div style={{height: 200, width:400, display: "flex"}}>
                <span style={{width:"33.33%", height: `${distributions.theme.low / distributions.theme.total * 100}%`, backgroundColor: "red"}}>
                    low
                </span>
                <span style={{width:"33.33%", height: `${distributions.theme.mid / distributions.theme.total * 100}%`, backgroundColor: "yellow"}}>
                    mid
                </span>
                <span style={{width:"33.33%", height: `${distributions.theme.high / distributions.theme.total * 100}%`, backgroundColor: "green"}}>
                    high
                </span>
            </div>
            <div style={{height: 200, width:400, display: "flex"}}>
                <span style={{width:"33.33%", height: `${distributions.liked.low / distributions.liked.total * 100}%`, backgroundColor: "red"}}>
                    low
                </span>
                <span style={{width:"33.33%", height: `${distributions.liked.mid / distributions.liked.total * 100}%`, backgroundColor: "yellow"}}>
                    mid
                </span>
                <span style={{width:"33.33%", height: `${distributions.liked.high / distributions.liked.total * 100}%`, backgroundColor: "green"}}>
                    high
                </span>
            </div>
            <button
            type="button"
            onClick={() => {
                socket.emit("nextPhase")
            }}
            >
                next
            </button>
        </>
    )
}