/**
 * This file contains the type definition and default values for the SongfestStatusContext used by Songfest.tsx
 * The interface is needed for autocomplete to give you the names of all the included attributes.
 * The defaults are there so Typescript doesn't complain that an attribute may be null. 
 * The defaults get overridden since Songfest.tsx defines values for all fields when using the context
 */

import { createContext } from "react";

interface SongfestStatus {
    songfestOpen: Boolean,
    setSongfestOpen: Function,

    participants: Array<string>,
    setParticipants: Function,

    songs: Record<string, Array<string>>,
    setSongs: Function,

    songsPerPerson: number,
    setSongsPerPerson: Function,

    theme: string,
    setTheme: Function,

    host: string,
    setHost: Function,

    startGame: Function
}

const SongfestStatusContext = createContext<SongfestStatus>({
    songfestOpen: false,
    setSongfestOpen: () => {},

    participants: [],
    setParticipants: () => {},

    songs: {},
    setSongs: () => {},

    songsPerPerson: 1,
    setSongsPerPerson: () => {},

    theme: "",
    setTheme: () => {},

    host: "",
    setHost: () => {},

    startGame: () => {}
})

export default SongfestStatusContext
