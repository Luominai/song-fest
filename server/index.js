const express = require("express")
const {Server} = require("socket.io")
const http = require("http")

// setup server
const app = express()
app.use(express.static(__dirname + "/dist"));
const server = http.createServer(app)
const io = new Server(server)

// store variables relating to songfest
let songfestStatus = {
    "songfestOpen": true,
    "participants": [],
    "songs": {},
    "songsPerPerson": 1,
    "theme": ""
}

io.on('connection', (socket) => { 
    console.log(socket.id); 

    socket.on('updateSongfestOpen', (state) => {
        songfestStatus["songfestOpen"] = state
        socket.emit('updateSongfestOpen', state)
    })
    socket.on('updateParticipants', (state) => {
        songfestStatus["participants"] = state
        socket.emit('updateParticipants', state)
    })
    socket.on('updateSongs', (state) => {
        songfestStatus["songs"] = state
        socket.emit('updateSongs', state)
    })
    socket.on('updateSongsPerPerson', (state) => {
        songfestStatus["songsPerPerson"] = state
        socket.emit('updateSongsPerPerson', state)
    })
    socket.on('updateTheme', (state) => {
        songfestStatus["theme"] = state
        socket.emit('updateTheme', state)
    })

    socket.on('getSongfestStatus', (id) => {
        console.log(`sending status to ${id}`)
        io.to(id).emit('receiveSongfestStatus', songfestStatus)
    })
    
})

server.listen(3000, () => {
    console.log("server is up on http://localhost:3000")
})