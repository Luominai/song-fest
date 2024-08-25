import Song from "./Song"
import Score from "../types/Score"

export default class Player {
    name: string
    socketId: string | null
    taken: boolean
    likedScore: Score
    themeScore: Score
    guessScore: number
    songs: Array<Song>
    
    constructor(name: string, numberOfSongs: number) {
        this.name = name
        this.socketId = null
        this.taken = false
        this.likedScore = {
            "low": 0,
            "mid": 0,
            "high": 0,
            "total": 0
        }
        this.themeScore = {
            "low": 0,
            "mid": 0,
            "high": 0,
            "total": 0
        }
        this.guessScore = 0
        this.songs = Array(numberOfSongs).fill(new Song(name))
    }

    addToThemeScore(value: Score | Omit<Score, "total">) {
        this.themeScore.low += value.low
        this.themeScore.mid += value.mid
        this.themeScore.high += value.high
        if ("total" in value) {
            this.themeScore.total += value.total
        }
    }

    addToLikedScore(value: Score | Omit<Score, "total">) {
        this.likedScore.low += value.low
        this.likedScore.mid += value.mid
        this.likedScore.high += value.high
        if ("total" in value) {
            this.likedScore.total += value.total
        }
    }
}