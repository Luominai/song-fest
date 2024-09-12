import { useEffect, useState } from "react"
import { socket } from "../Socket"

export default function GameGuessingReview() {
    const [distributions, setDistributions] = useState<Record<string, number> | null>(null)

    // on render, fetch the score distribution from the server
    useEffect(() => {
        socket.emit("getDistributions", "guessing")
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
            <h3>Guessing Summary</h3>
            <div style={{height: 600, width:200, overflow: "scroll"}}>
                {Object.entries(distributions).map(([name, guessCount]) => {
                    return (
                        <div style={{width: "100%"}}>
                            {name}: {guessCount}
                        </div>
                    )
                })}
            </div>
            <button
            className="nextPhase"
            type="button"
            onClick={() => {
                // gameState?.emitFunctions.nextPhase()
                socket.emit("nextPhase")
            }}
            >
                next
            </button>
        </>
    )
}