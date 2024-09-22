import { useEffect, useState } from "react"
import { socket } from "../Socket"
import { Score } from "../../../common"
import "../css/ratingReview.css"

export default function GameRatingReview({mock}: {mock?: {liked: Score, theme: Score}}) {
    const [distributions, setDistributions] = useState<{liked: Score, theme: Score} | null>(mock??null)

    // on render, fetch the score distribution from the server
    useEffect(() => {
        if (!distributions) {
            socket.emit("getDistributions", "rating")
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

    return (
        <>
            <h3 className="header">Rating Summary</h3>
            <div className="bars"> 
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex"}}>
                        <VerticalBar count={distributions.liked.low} heightPercent={distributions.liked.low / distributions.liked.total} color="rgb(255,96,96,255)"/>
                        <VerticalBar count={distributions.liked.mid} heightPercent={distributions.liked.mid / distributions.liked.total} color="rgba(255,201,97,255)"/>
                        <VerticalBar count={distributions.liked.high} heightPercent={distributions.liked.high / distributions.liked.total} color="rgba(110,238,161,255)"/>
                    </div>
                    <div className="label">
                        liked score
                    </div>
                </div>      

                <div style={{width: "10px"}}>
                </div>         

                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex"}}>
                        <VerticalBar count={distributions.theme.low} heightPercent={distributions.theme.low / distributions.theme.total} color="rgb(255,96,96,255)"/>
                        <VerticalBar count={distributions.theme.mid} heightPercent={distributions.theme.mid / distributions.theme.total} color="rgba(255,201,97,255)"/>
                        <VerticalBar count={distributions.theme.high} heightPercent={distributions.theme.high / distributions.theme.total} color="rgba(110,238,161,255)"/>
                    </div>
                    <div className="label">
                        theme score
                    </div>
                </div>
            </div> 
            <div className="buttonContainer">
                <button
                className="nextPhase"
                type="button"
                onClick={() => {
                    socket.emit("nextPhase")
                }}
                >
                    next
                </button>
            </div>
        </>
    )
}

function VerticalBar({count, heightPercent, color}: {count?: number, heightPercent: number, color: string}) {
    const [style, setStyle] = useState({
        height: "2%", 
        backgroundColor: color
    })

    useEffect(() => {
        setStyle({...style, height: `${2 + (98 * heightPercent)}%`} )
    })

    return (
        <>
            <div className="bar-container">
                <div className="bar" style={style}>
                {/* <div className="number">{number}</div> */}
                
                </div>
                <div className="label" style={{color: color}}>
                    {count ?? ""}
                </div>
            </div>
        
            {/* <div className="label">
                {label}
            </div> */}
        </>
    )
}