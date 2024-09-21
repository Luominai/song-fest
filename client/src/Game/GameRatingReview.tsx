import { useEffect, useState } from "react"
import { socket } from "../Socket"
import { Score } from "../../../common"
import "../css/ratingReview.css"

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
            
            <Bar heightPercent={distributions.liked.low / distributions.liked.total} color="red"/>
            <Bar heightPercent={distributions.theme.low / distributions.theme.total} color="red"/>

            <Bar heightPercent={distributions.liked.mid / distributions.liked.total} color="yellow"/>
            <Bar heightPercent={distributions.theme.mid / distributions.theme.total} color="ywllow"/>

            <Bar heightPercent={distributions.liked.high / distributions.liked.total} color="green"/>
            <Bar heightPercent={distributions.theme.high / distributions.theme.total} color="green"/>
            
            <button
            className="nextPhase"
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

function Bar({label = "", heightPercent, color}: {label?: string, heightPercent: number, color: string}) {
    const [style, setStyle] = useState({
        height: "5%", 
        backgroundColor: color
    })

    useEffect(() => {
        setStyle({...style, height: `${5 + (95 * heightPercent)}%`} )
    })

    return (
        <>
            <div className="bar-container">
                <div className="bar" style={style}>
                {/* <div className="number">{number}</div> */}
                
                </div>
            </div>
        
            <div className="label">
                {label}
            </div>
        </>
    )
}