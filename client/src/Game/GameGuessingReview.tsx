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
            <div style={{height: "100px", width: "200px", overflow: "scroll", scrollbarWidth: "thin"}}>
                {Object.entries(distributions).sort((a, b) => {
                    return b[1] - a[1]
                })
                .map(([name, guessCount]) => {
                    return (
                        <HorizontalBar label={name} count={guessCount} percent={guessCount / totalGuesses}/>
                    )
                })}
            </div>
            <div className="buttonContainer">
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
            </div>
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
        <div style={{display: "flex", alignItems: "center"}}>
            <div className="name-label">
                {label}
            </div>
            <div className="guessing-bar-container">
                <div className="guessing-bar" style={style}>
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