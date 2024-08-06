const express = require("express")
const {Server} = require("socket.io")
const http = require("http")

// setup server
const app = express()
app.use(express.static(__dirname + "/dist"));
const server = http.createServer(app)
const io = new Server(server)

// import functions
var songfestSockets = require("./SongfestSockets")
var gameSockets = require("./GameSockets")
const gameSetup = require("./gameSetup")


// how to account for duplicate songs?
//  - if we prevent people from submitting dupes, then it might narrow down that person's search pool when the song appears
// how can we avoid giving people an unfair advantage?
//  - every submission of the song will play
//  - if someone guesses any of the people who submitted a song, the guesser gets a point
//  - when the next instance of the song appears, the person previously guessed cannot be guessed again, forcing everyone to guess the other submitters

// store variables relating to songfest
let songfestStatus = {
    "songfestOpen": false,
    "participants": [],         // array of participants
                                // ["kevin", "better kevin"]

    "songs": {},                // map containing an array of songs submitted by every player
                                // {
                                //     "kevin": [
                                //         "${rick roll clip url}", 
                                //         "${stickbug clip url}"
                                //     ]
                                // }
    "songsPerPerson": 1,
    "theme": "",
    "host": ""                  // name of host
}

// variables relating to the game state
let gameState = {
    "participants": [],         // copy of participants from SongfestStatus
    "host": "",                 // copy of host from SongfestStatus

    "currentSongIndex": 0,      // index of current song in songEmbedData
    "currentSong": {},          // the current song   
                                // {
                                //     "videoId": "${videoId}",
                                //     "startSeconds": 8.1394,
                                //     "endSeconds": 21.4598,
                                //     "clipId": "${clipId}",
                                //     "submitter": "kevin"
                                // }    
    "currentSongSubmitter": "", // name of the person who submitted the current song
    "everyoneRated": false,     // boolean indicating if everyone has given their rating for the current song
    "everyoneGuessed": false,   // boolean indicating if everyone has given their guess for the current song

    "playerNamesTaken": [],     // Tracks players and their socket ids
                                // [
                                //      {"name": "kevin", "id": "ajjkbakjbf", "taken": true},
                                //      {"name": "better kevin", "id": null, "taken": false}
                                // ]        

    "phase": -1,                // string indicating what phase of the game we're on
                                // -1: player select screen
                                // 0: rating phase: 
                                //      players watch the song and give it 2 scores. 
                                //      one for how much it fit the theme (doesn't fit / fits okay / fits great)
                                //      one for how much they like the clip. (sounds bad / sounds okay / sounds great)
                                //      there is a time limit but no penalty for being slow.
                                // 1: review rating phase:
                                //      players see how many votes each option receives and the total score.
                                //      once everyone votes to continue, the game goes to the next phase.
                                // 2: guessing phase: 
                                //      players guess who submitted the song.
                                //      points received decreases over time.
                                // 3: review guessing phase:
                                //      players see how many vote everyone got but not who submitted.
                                //      once everyone votes to continue, the game goes to the next phase.
                                // 4: reveal phase: 
                                //      the youtube videos appear one by one and the submitter is revealed.
                                //      participants get points.
                                //      at the end, players and songs are sorted by descending points in a leaderboard

    "participantsLockedIn": [], // when a player submits their rating, add their name to this list so they don't resubmit
                                // [
                                //     "kevin",
                                //     "better kevin"
                                // ]

    "songEmbedData": [],        // array of data needed to create the youtube embed of the clip
                                // this data will get passed to the client when the songs plays during the game
                                // the server will loop through this array and send the data each round
                                // [
                                //     {
                                //         "videoId": "${videoId}",
                                //         "startSeconds": 8.1394,
                                //         "endSeconds": 21.4598,
                                //         "clipId": "${clipId}",
                                //         "submitter": "kevin"
                                //     }
                                // ]

    "songScores": {},           // map containing data for each song 
                                // {
                                //     "${clipId}": {
                                //         "themeScore": 1, 
                                //         "likedScore": 1, 
                                //         "submitter": "kevin"
                                //     }
                                // }

    "playerScores": {},         // map containing data for each player 
                                // {
                                //     "kevin" : {
                                //         "themeScore": 1, 
                                //         "likedScore": 1
                                //     }
                                // }
}

io.on('connection', (socket) => { 
    console.log(socket.id); 

    songfestSockets.useSongfestSockets(socket, songfestStatus, io)
    gameSockets.useGameSockets(socket, gameState, io)
    
    socket.on("startGame", async () => {
        await gameSetup.startGame(songfestStatus, gameState)
        console.log(gameState)
        io.emit("startGame")
    })

})

server.listen(3000, () => {
    console.log("server is up on http://localhost:3000")
})