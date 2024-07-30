import { useState } from "react"
import ReactPlayer from "react-player/youtube"

interface Song {
    "videoId": string,
    "startSeconds": number,
    "endSeconds": number,
    "clipId": string,
    "submitter": string
}

function SongfestGame() {
    const [currentSong, setCurrentSong] = useState<Song | null>()

    return (
        <>
            <div>
                this is the game screen
            </div>

            <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ'/>
            
        </>
    )
}

export default SongfestGame