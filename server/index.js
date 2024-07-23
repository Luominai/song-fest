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
    console.log('Connected'); 

    socket.on('test', (socket) => {
        console.log("button clicked")
    })

    // when receiving message from client that the songfest status has changed
    socket.on('songfestStatusChanged', (newSongfestStatus) => {
        if (songfestStatus != newSongfestStatus) {
            // update the server's songfest status
            songfestStatus = newSongfestStatus
            // send the updated status to clients
            socket.emit('updateSongfestStatus', songfestStatus)
        }
    })

    socket.on('getSongfestStatus', () => {
        socket.emit('receiveSongfestStatus', songfestStatus)
    })
    
})

server.listen(3000, () => {
    console.log("server is up on http://localhost:3000")
})