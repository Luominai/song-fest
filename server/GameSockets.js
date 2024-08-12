module.exports = {
    useGameSockets: (socket, gameState, io) => {
        // ======================== game state sockets ========================
        socket.on("getGameState", () => {
            socket.emit("receiveGameState", gameState)
        })
        socket.on("updatePhase", (state) => {
            // check if the socket is the host before changing phases
            const player = gameState.playerNamesTaken.find((entry) => entry.id == socket.id)
            const host = gameState.playerNamesTaken.find((entry) => entry.name == gameState.host)
            if (player == host) {
                console.log(`updated phase to ${state}`)
                gameState.phase = state
                io.emit("updatePhase", state)   
            }
        })
        socket.on("updatePlayer", (state) => {
            // if the player name is not taken, then let the person requesting have it
            const player = gameState.playerNamesTaken.find((entry) => entry.name == state)
            const nameTaken = player.taken
            if (!nameTaken) {
                // find the player and update their id
                const indexOfPlayer = gameState.playerNamesTaken.findIndex((entry) => entry == player)
                gameState.playerNamesTaken[indexOfPlayer].id = socket.id
                gameState.playerNamesTaken[indexOfPlayer].taken = true

                console.log(`registered ${socket.id} as ${state}`)

                // update on the player's end
                socket.emit("updatePlayer", state)

                // update the list of available player names on everyone's end
                io.emit("updatePlayerNamesTaken", gameState.playerNamesTaken)
            }
        })
        socket.on("disconnect", () => {
            // on disconnect, remove socket id from player
            const indexOfPlayer = gameState.playerNamesTaken.findIndex((entry) => entry.id == socket.id)
            if (indexOfPlayer != -1) {
                gameState.playerNamesTaken[indexOfPlayer].id = null
                gameState.playerNamesTaken[indexOfPlayer].taken = false
            }
        })

        socket.on("rate", (score) => {
            const index = gameState.songScores.findIndex((song) => song.clipId == gameState.currentSong.clipId)
            let song = gameState.songScores[index]
            const player = gameState.playerNamesTaken.find((player) => player.id == socket.id) 
            
            // update scores if this player has not submitted a score yet
            if (!gameState.participantsLockedIn.includes(player.name)) {
                song.likedDistribution[score.liked] += 1
                song.themeDistribution[score.theme] += 1

                gameState.songScores[index] = song
                gameState.participantsLockedIn.push(player.name)
                console.log(gameState.participantsLockedIn)

                console.log(`${player.name} has submitted their rating:`, score)
            }

            // if everyone has submitted, end this phase
            if (gameState.participantsLockedIn.length == gameState.participants.length) {
                gameState.phase += 1
                io.emit("updateThemeDistribution", {
                    ...song.themeDistribution,
                    ["sum"]: Object.values(song.themeDistribution).reduce(
                        (runningSum, currentValue) => {
                            return runningSum + currentValue
                        }, 0
                    )
                })
                io.emit("updateLikedDistribution", song.likedDistribution)
                io.emit("updatePhase", gameState.phase) 
                console.log(`updated phase to ${gameState.phase}`)
            }
        })
    }
}