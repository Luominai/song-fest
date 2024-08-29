import ClientState from "../types/ClientState";
import Player from "./Player";
import Song from "./Song";

export default class Songfest {
    // songfest
    gameInProgress: boolean
    songfestOpen: boolean
    players: Array<Player>
    songsPerPerson: number
    theme: string
    host: Player
    // game
    songs: Array<Song>
    currentSong: Song  
    currentSongSubmitter: Player
    currentSongIndex: number
    phase: number
    playersLockedIn: Array<string>
    
    constructor() {
        this.gameInProgress = false
        this.songfestOpen = false
        this.players = []
    }

    startGame() {
        this.songs = this.players.map((player) => player.songs).flat().filter((entry) => entry.initialized)

        let guessDistribution = {}
        this.players.forEach((entry) => {
            guessDistribution[entry.name] = 0
        })
        this.songs.forEach((entry) => {
            entry.guessDistribution = structuredClone(guessDistribution)
        })
        
        this.shuffleSongs()
        this.currentSong = this.songs[0]
        this.currentSongIndex = -1
        this.currentSongSubmitter = this.players.find((entry) => entry.name == this.currentSong.submitterName)
        this.phase = -1
        this.playersLockedIn = []
        this.gameInProgress = true
    }

    updatePlayerSocket(player: Player, socketId: string) {
        const index = this.players.findIndex((entry) => entry.name == player.name)
        this.players[index].socketId = socketId
    }

    nextPhase() {
        // if we've gone through every song, switch to the end phase
        if (this.currentSongIndex + 1 == this.songs.length) {
            console.log("game is over")
            this.phase = 4
        }
        // otherwise, go through the regular cycle
        else {
            this.phase = (this.phase + 1) % 4
        }
    }

    nextSong() {
        if (this.currentSongIndex >= this.songs.length) {
            return
        }
        const nextSongIndex = this.currentSongIndex + 1
        const nextSong = this.songs[nextSongIndex]
        console.log(`switching to song ${nextSongIndex + 1}/${this.songs.length}: ${nextSong.title} from ${nextSong.submitterName}`)
        this.currentSongIndex = nextSongIndex
        this.currentSong = nextSong
        this.currentSongSubmitter = this.players.find((entry) => entry.name == nextSong.submitterName)
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

    toClientState() {
        const clientState: Omit<ClientState, "myPlayer"> = {
            gameInProgress: this.gameInProgress,
            songfestOpen: this.songfestOpen,
            theme: this.theme,
            songsPerPerson: this.songsPerPerson,
            currentSong: this.currentSong,
            phase: this.phase,
            playerNames: this.players.map((entry) => {
                return {
                    name: entry.name,
                    taken: entry.taken
                }
            })
        }
        return clientState
    }
}