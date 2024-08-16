import Player from "./Player"
import Song from "./Song"
import Songfest from "./Songfest"

export default class Game {
    constructor(songfest: Songfest) {
        this._players = songfest.players
        this._host = songfest.host
        this._songs = songfest.players.map((player) => player.songs).flat()
        this.shuffleSongs()
        this._currentSong = this.songs[0]
        this._currentSongIndex = 0
        this._currentSongSubmitter = this._currentSong.submitter
        this._phase = -1
        this._playersLockedIn = []
    }

    private _host: string                  
    public get host(): string {
        return this._host
    }
    public set host(value: string) {
        this._host = value
    }

    private _currentSong: Song            
    public get currentSong(): Song {
        return this._currentSong
    }
    public set currentSong(value: Song) {
        this._currentSong = value
    }

    private _currentSongSubmitter: Player
    public get currentSongSubmitter(): Player {
        return this._currentSongSubmitter
    }
    public set currentSongSubmitter(value: Player) {
        this._currentSongSubmitter = value
    }

    private _currentSongIndex: number
    public get currentSongIndex(): number {
        return this._currentSongIndex
    }
    public set currentSongIndex(value: number) {
        this._currentSongIndex = value
    }

    private _players: Array<Player>
    public get players(): Array<Player> {
        return this._players
    }
    public set players(value: Array<Player>) {
        this._players = value
    }

    private _phase: number
    public get phase(): number {
        return this._phase
    }
    public set phase(value: number) {
        this._phase = value
    }

    private _songs: Array<Song>
    public get songs(): Array<Song> {
        return this._songs
    }
    public set songs(value: Array<Song>) {
        this._songs = value
    }

    private _playersLockedIn: Array<string>
    public get playersLockedIn(): Array<string> {
        return this._playersLockedIn
    }
    public set playersLockedIn(value: Array<string>) {
        this._playersLockedIn = value
    }

    updatePlayerSocket(player: Player, socketId: string) {
        const index = this._players.findIndex((entry) => entry.name == player.name)
        this._players[index].socketId = socketId
    }

    nextPhase() {
        // if we've gone through every song, switch to the end phase
        if (this.currentSongIndex == this.songs.length) {
            this._phase = 4
        }
        // otherwise, go through the regular cycle
        else {
            this._phase = (this._phase + 1) % 4
        }
    }

    nextSong() {
        this.currentSongIndex += 1
        this.currentSong = this.songs[this.currentSongIndex]
        this.currentSongSubmitter = this.currentSong.submitter
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleSongs() {
        let currentIndex = this.songs.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.songs[currentIndex], this.songs[randomIndex]] = [
            this.songs[randomIndex], this.songs[currentIndex]];
        }
    }

    toString() {
        return JSON.stringify({
            "host": this.host,
            "currentSong": this.currentSong,
            "players": this.players.map((player) => player.toJson),
            "phase": this.phase,
            "songs": this.songs
        })
    }

    toJson() {
        return {
            "host": this.host,
            "currentSong": this.currentSong,
            "players": this.players.map((player) => player.toJson),
            "phase": this.phase,
            "songs": this.songs
        }
    }
}