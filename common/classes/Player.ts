import Song from "./Song"
import Score from "../types/Score"

export default class Player {
    constructor(name: string) {
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
        this.songs = []
    }

    private _name: string
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }

    private _socketId: string | null
    public get socketId(): string | null {
        return this._socketId
    }
    public set socketId(value: string | null) {
        this._socketId = value
    }

    private _taken: boolean
    public get taken(): boolean {
        return this._taken
    }
    public set taken(value: boolean) {
        this._taken = value
    }

    private _likedScore: Score
    public get likedScore(): Score {
        return this._likedScore
    }
    public set likedScore(value: Score) {
        this._likedScore = value
    }
    
    private _themeScore: Score
    public get themeScore(): Score {
        return this._themeScore
    }
    public set themeScore(value: Score) {
        this._themeScore = value
    }

    private _guessScore: number
    public get guessScore(): number {
        return this._guessScore
    }
    public set guessScore(value: number) {
        this._guessScore = value
    }

    private _songs: Array<Song>
    public get songs(): Array<Song> {
        return this._songs
    }
    public set songs(value: Array<Song>) {
        this._songs = value
    }

    addToThemeScore(value: Score | Omit<Score, "total">) {
        this._themeScore.low += value.low
        this._themeScore.mid += value.mid
        this._themeScore.high += value.high
        if ("total" in value) {
            this._themeScore.total += value.total
        }
    }

    addToLikedScore(value: Score | Omit<Score, "total">) {
        this._likedScore.low += value.low
        this._likedScore.mid += value.mid
        this._likedScore.high += value.high
        if ("total" in value) {
            this._likedScore.total += value.total
        }
    }

    toString() {
        return JSON.stringify({
            "name": this._name,
            "socket": this._socketId,
            "taken": this._taken,
            "themeScore": this._themeScore,
            "likedScore": this.likedScore
        })
    }

    toJson() {
        return {
            "name": this._name,
            "socket": this._socketId,
            "taken": this._taken,
            "themeScore": this._themeScore,
            "likedScore": this.likedScore
        }
    }
}