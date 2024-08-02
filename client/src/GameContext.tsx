/**
 * This file contains the type definition and default values for the GameContext used by Game.tsx
 * The interface is needed for autocomplete to give you the names of all the included attributes.
 * The defaults are there so Typescript doesn't complain that an attribute may be null. 
 * The defaults get overridden since Game.tsx defines values for all fields when using the context
 */

import { createContext } from "react";
import Song from "./types/Song"

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
