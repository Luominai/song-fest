import { Socket, Server } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import Game from "./Game"
import ClientToServerEvents from "./types/ClientToServerEvents"
import ServerToClientEvents from "./types/ServerToClientEvents"
import Score from "./types/Score"

export default function registerGameHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>, game: Game, io: Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>) {
    socket.on("nextPhase", () => {
        game.nextPhase()
    })

    socket.on("nextSong", () => {
        game.nextSong()
    })

    socket.on("guessSongSubmitter", (guessedPlayerName: string) => {
        // check if the player who guessed exists
        const player = game.players.find((entry) => entry.socketId == socket.id)
        if (!player) {
            return
        }
        // check if the player who guessed has already guessed
        if (game.playersLockedIn.includes(player.name)) {
            return
        }
        // if the player guessed correctly, give points and then lock them
        if (guessedPlayerName == game.currentSongSubmitter.name) {
            player.guessScore += 1
            game.playersLockedIn.push(player.name)
        }
    })

    socket.on("rateSong", (score: { 
        liked: Score; 
        theme: Score; 
    }) => {
        // check if the player who scored exists
        const player = game.players.find((entry) => entry.socketId == socket.id)
        if (!player) {
            return
        }
        // check if the player who scored has already scored
        if (game.playersLockedIn.includes(player.name)) {
            return
        }
        // give score to the song and the song's submitter
        game.currentSong.addToLikedScore(score.liked)
        game.currentSong.addToThemeScore(score.theme)
        game.currentSongSubmitter.addToLikedScore(score.liked)
        game.currentSongSubmitter.addToThemeScore(score.theme)
    })

    socket.on("registerSocketToPlayer", (playerName: string) => {
        // get the player corresponding to the playerName
        const player = game.players.find((entry) => entry.name == playerName) 
        // check if the player exists
        if (!player) {
            return
        }
        // check if the player already has a registered socket
        if (player.socketId != null) {
            return
        }
        // set the player's socket to the requesting socket and set them to be taken
        player.socketId = socket.id
        player.taken = true
    })

}