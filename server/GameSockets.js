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
    }
}