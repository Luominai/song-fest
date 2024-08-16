import ClientSong from "./ClientSong"

export default interface ClientGame {
    host: string
    currentSong: ClientSong
}