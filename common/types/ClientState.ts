import Player from "../classes/Player"
import Song from "../classes/Song"

export default interface State {
    // app
    gameInProgress: boolean
    // songfest
    songfestOpen: boolean
    theme: string
    songsPerPerson: number
    // game
    currentSong: Song | null
    phase: number
    // both
    myPlayer: Player | null
    playerNames: String[]
}