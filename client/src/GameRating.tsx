import { useState } from "react"
import YouTube from "react-youtube"

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
    
    return (
        <>
            <div>
                Rate the Song
            </div>

            {(currentSong != null) 
            ? 
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
            />
            :
            <div>
                placeholder
            </div>
            }
        </>
    )
}