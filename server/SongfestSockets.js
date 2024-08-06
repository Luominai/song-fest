module.exports = {
    useSongfestSockets: (socket, songfestStatus, io) => {
        // ======================== songfest status sockets ========================
        socket.on('updateSongfestOpen', (state) => {
            console.log(`updating SongfestOpen to ${state} `)
            songfestStatus["songfestOpen"] = state
            io.emit('updateSongfestOpen', state)
        })
        socket.on('updateParticipants', (state) => {
            console.log(`updating Participants to [${state}]`)
            songfestStatus["participants"] = state
            io.emit('updateParticipants', state)
        })
        socket.on('updateSongs', (state) => {
            console.log(`updating Songs to ${JSON.stringify(state)}`)
            songfestStatus["songs"] = state
            io.emit('updateSongs', state)
        })
        socket.on('updateSongsPerPerson', (state) => {
            console.log(`updating SongsPerPerson to ${state}`)
            songfestStatus["songsPerPerson"] = state
            io.emit('updateSongsPerPerson', state)
        })
        socket.on('updateTheme', (state) => {
            console.log(`updating Theme to ${state}`)
            songfestStatus["theme"] = state
            io.emit('updateTheme', state)
        })
        socket.on("updateHost", (state) => {
            console.log(`updating Host to ${state}`)
            songfestStatus["host"] = state
            io.emit('updateHost', state)
        })
        socket.on('getSongfestStatus', () => {
            console.log(`sending SongfestStatus to ${socket.id}`)
            socket.emit('receiveSongfestStatus', songfestStatus)
        })
    }
}