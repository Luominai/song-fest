// import { Socket, Server } from "socket.io"
// import { DefaultEventsMap } from "socket.io/dist/typed-events"
// import { ClientToServerEvents, Game, Score, ServerToClientEvents } from "../../common"

// export default function registerGameHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>, gameStatus: Game, io: Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>) {
//     socket.on("getGameStatus", () => {
//         console.dir(gameStatus, {depth: null})
//         socket.emit("updateGameStatus", gameStatus)
//     })
//     socket.on("nextPhase", () => {
//         gameStatus.nextPhase()
//         // change the song if the current phase is 0 (the start of a new cycle for a song)
//         if (gameStatus.phase == 0) {
//             gameStatus.nextSong()
//         }
//         // update clients on the change
//         io.emit("updateGameStatus", gameStatus)
//     })

//     socket.on("guessSongSubmitter", (guess: {playerName: string, time: number}) => {
//         // check if the player who guessed exists
//         const player = gameStatus.players.find((entry) => entry.socketId == socket.id)
//         if (!player) {
//             return
//         }
//         // check if the player who guessed has already guessed
//         if (gameStatus.playersLockedIn.includes(player.name)) {
//             return
//         }
//         // lock the player in
//         gameStatus.playersLockedIn.push(player.name)

//         // if the player guessed correctly, give points
//         if (guess.playerName == gameStatus.currentSongSubmitter.name) {
//             player.guessScore += 1
//             console.log(`${player.name} guessed ${guess.playerName} with ${guess.time / 1000}s remaining`)
//         }

//         // add to the song's guess distribution
//         if (guess.playerName in gameStatus.currentSong.guessDistribution) {
//             gameStatus.currentSong.guessDistribution[guess.playerName] += 1
//         }
        
//         // if everyone has guessed, go to next phase
//         if (gameStatus.playersLockedIn.length + 1 == gameStatus.players.length) {
//             gameStatus.playersLockedIn = []
//             gameStatus.nextPhase()
//             io.emit("updateGameStatus", gameStatus)
//         }
//     })

//     socket.on("rateSong", (score: { 
//         liked: Score; 
//         theme: Score; 
//     }) => {
//         // check if the player who scored exists
//         const player = gameStatus.players.find((entry) => entry.socketId == socket.id)
//         if (!player) {
//             return
//         }
//         // check if the player who scored has already scored
//         if (gameStatus.playersLockedIn.includes(player.name)) {
//             return
//         }
//         // lock the player in
//         gameStatus.playersLockedIn.push(player.name)

//         // give score to the song and the song's submitter
//         gameStatus.currentSong.addToLikedScore(score.liked)
//         gameStatus.currentSong.addToThemeScore(score.theme)
//         gameStatus.currentSongSubmitter.addToLikedScore(score.liked)
//         gameStatus.currentSongSubmitter.addToThemeScore(score.theme)

//         // if everyone has scored, go to next phase
//         if (gameStatus.playersLockedIn.length + 1 == gameStatus.players.length) {
//             gameStatus.playersLockedIn = []
//             gameStatus.nextPhase()
//             io.emit("updateGameStatus", gameStatus)
//         }
//     })

//     socket.on("registerSocketToPlayer", (playerName: string) => {
//         // get the player corresponding to the playerName
//         const player = gameStatus.players.find((entry) => entry.name == playerName) 
//         // check if the player exists
//         if (!player) {
//             return
//         }
//         // check if the player already has a registered socket
//         if (player.socketId != null) {
//             return
//         }
//         // set the player's socket to the requesting socket and set them to be taken
//         player.socketId = socket.id
//         player.taken = true
//         // update clients on the change
//         io.emit("updateGameStatus", gameStatus)
//     })

// }