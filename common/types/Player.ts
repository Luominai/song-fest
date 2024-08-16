import Score from "./Score"
import Song from "./Song"

export default interface Player {
    name: string
    socketId: string | null
    taken: boolean
    likedScore: Score
    themeScore: Score
    guessScore: number
    songs: Array<Song>
}