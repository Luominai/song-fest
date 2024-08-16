import ClientSongfest from "./ClientSongfest"
import ClientGame from "./ClientGame"

export default interface ServerToClientEvents {
    updateSongfestStatus: (state: ClientSongfest) => void
    updateGameStatus: (state: ClientGame) => void
    startGame: () => void

    startProcessingSongs: () => void
    endProcessingSongs: () => void
}