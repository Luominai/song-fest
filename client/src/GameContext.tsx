import { createContext } from "react";

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

interface Game {
    currentSong: Song,
    setCurrentSong: Function
}

const GameContext = createContext<Game>({
    currentSong: defaultSong,
    setCurrentSong: () => {},

    
})

export default GameContext
