import express from "express"
import {Server} from "socket.io"
import http from "http"

// setup server
const app = express()
app.use(express.static(__dirname + "/dist"));
const server = http.createServer(app)
const io = new Server<
    ClientToServerEvents, 
    ServerToClientEvents
>(server)

// import functions
import registerSongfestHandler from "./songfestHandler"
import registerGameHandler from "./gameHandler"
import { ClientToServerEvents, ServerToClientEvents, Songfest, Game } from "../../common";


// how to account for duplicate songs?
//  - if we prevent people from submitting dupes, then it might narrow down that person's search pool when the song appears
// how can we avoid giving people an unfair advantage?
//  - every submission of the song will play
//  - if someone guesses any of the people who submitted a song, the guesser gets a point
//  - when the next instance of the song appears, the person previously guessed cannot be guessed again, forcing everyone to guess the other submitters

// store variables relating to songfest
const songfest = new Songfest()
let game: Game

io.on('connection', (socket) => { 
    console.log(socket.id); 

    registerSongfestHandler(socket, songfest, io)
    if (game) {
        registerGameHandler(socket, game, io)
    }
    
    socket.on("startGame", () => {
        game = new Game(songfest)
        io.emit("startGame")
    })

    socket.on("disconnect", () => {
        // on disconnect, remove socket from the player who disconnected
        const player = game.players.find((entry) => entry.socketId == socket.id)
        if (player) {
            player.socketId = null
            player.taken = false
        }
    })

})

server.listen(3000, () => {
    console.log("server is up on http://localhost:3000")
})