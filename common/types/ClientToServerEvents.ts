import Player from "../classes/Player";
import Score from "./Score";

export default interface ClientToServerEvents {
    getState: () => void
    getPlayerByName: (name: string) => void

    cancelSongfest: () => void

    submitSongs: (data: Player) => void

    startSongfest: (settings: {
        songsPerPerson: number
        theme: string
        host: string
    }) => void
    startGame: () => void

    nextPhase: () => void

    registerSocketToPlayer: (playerName: string) => void
    deregisterSocketFromPlayer: (playerName: string) => void
    rateSong: (score: {
        liked: Score
        theme: Score
    }) => void
    guessSongSubmitter: (guess: {playerName: string, time: number}) => void

    isThisMySong: () => void
    getDistributions: (ratingOrGuessing: "rating" | "guessing") => void
}