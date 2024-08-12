import { useState } from "react"

interface Score {
    "low": number,
    "mid": number,
    "high": number,
    "sum": number
}

export default function GameRatingReview({likedDistribution, themeDistribution}: {likedDistribution: Score, themeDistribution: Score}) {

    return (
        <>
            <h3>Rating Summary</h3>
            <div style={{height: 200, width:400, display: "flex"}}>
                <span style={{width:"33.33%", height: `${themeDistribution.low / themeDistribution.sum * 100}%`, backgroundColor: "red"}}>

                </span>
                <span style={{width:"33.33%", height: `${themeDistribution.mid / themeDistribution.sum * 100}%`, backgroundColor: "yellow"}}>
                    
                </span>
                <span style={{width:"33.33%", height: `${themeDistribution.high / themeDistribution.sum * 100}%`, backgroundColor: "green"}}>
                    
                </span>
            </div>
            <div style={{height: 200}}>
                <span style={{width:"33.33%", height: `${likedDistribution.high / likedDistribution.sum * 100}%`, backgroundColor: "red"}}>

                </span>
                <span style={{width:"33.33%", height: `${likedDistribution.high / likedDistribution.sum * 100}%`, backgroundColor: "yellow"}}>
                    
                </span>
                <span style={{width:"33.33%", height: `${likedDistribution.high / likedDistribution.sum * 100}%`, backgroundColor: "green"}}>
                    
                </span>
            </div>
        </>
    )
}