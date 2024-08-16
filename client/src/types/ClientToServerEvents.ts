import ClientSong from "./ClientSong";
import Score from "./Score";

export default interface ClientToServerEvents {
    cancelSongfest: () => void

    getSongfestStatus: () => void

    submitSongs: (data: {
        playerName: string
        songData: Array<Pick<ClientSong, "url"> & Partial<Omit<ClientSong, "url">>>
    }) => void

    startSongfest: (settings: {
        songsPerPerson: number
        theme: string
        host: string
    }) => void
    startGame: () => void

    nextPhase: () => void
    nextSong: () => void

    registerSocketToPlayer: (playerName: string) => void
    rateSong: (score: {
        liked: Score
        theme: Score
    }) => void
    guessSongSubmitter: (playerName: string) => void

}