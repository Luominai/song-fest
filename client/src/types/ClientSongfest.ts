import ClientSong from "./ClientSong"

export default interface ClientSongfest {
    songfestOpen: boolean
    players: Array<{
        name: string
        taken: boolean
        songs: Array<ClientSong>
    }>
    songsPerPerson: number
    theme: string
    host: string
}