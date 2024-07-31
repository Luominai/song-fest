import { useState } from "react"
import YouTube from "react-youtube"
import "./game.css"

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

function SongfestGame() {
    const [currentSong, setCurrentSong] = useState<Song | null>(defaultSong)

    return (
        <>
            <div>
                this is the game screen
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

export default SongfestGame