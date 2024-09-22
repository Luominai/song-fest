import { useEffect, useState } from "react"
import { socket } from "../Socket"
import "../css/guessingReview.css"

export default function GameGuessingReview({mock}: {mock?: Record<string, number>}) {
    const [distributions, setDistributions] = useState<Record<string, number> | null>(mock ?? null)

    // on render, fetch the score distribution from the server
    useEffect(() => {
        if (!distributions) {
            socket.emit("getDistributions", "guessing")
        }
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

    const totalGuesses = Object.values(distributions).reduce((prev, current) => {
        return prev + current
    })

    return (
        <>
            <h3 className="header">Guessing Summary</h3>
            <div style={{height: 600, width:200, overflow: "scroll"}}>
                {Object.entries(distributions).map(([name, guessCount]) => {
                    return (
                        <HorizontalBar label={name} count={guessCount} percent={guessCount / totalGuesses}/>
                        // <div style={{width: "100%"}}>
                        //     {name}: {guessCount}
                        // </div>
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

function HorizontalBar({label, count, percent}: {label: string, count: number, percent: number}) {
    const [style, setStyle] = useState({
        width: "2%", 
        backgroundColor: `rgba(95,168,255)`,
        filter: `brightness(${75 + 25*percent}%)`
    })

    useEffect(() => {
        setStyle({...style, width: `${2 + (98 * percent)}%`} )
    })

    return (
        <div style={{display: "flex"}}>
            <div className="name-label">
                {label}
            </div>
            <div className="bar-container">
                <div className="bar" style={style}>
                {/* <div className="number">{number}</div> */}
                
                </div>
                <div className="number-label">
                    {count}
                </div>
            </div>
        
            {/* <div className="label">
                {label}
            </div> */}
        </div>
    )
}