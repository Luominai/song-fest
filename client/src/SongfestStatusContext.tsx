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

    gameStart: boolean,
    setGameStart: Function
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

    gameStart: false,
    setGameStart: () => {}
})

export default SongfestStatusContext
