const express = require("express")
const {Server} = require("socket.io")
const http = require("http")

const app = express()
app.use(express.static(__dirname + "/dist"));
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => { 
    console.log('Connected'); 

    socket.on('test', (socket) => {
        console.log("button clicked")
    })
    
})

server.listen(3000, () => {
    console.log("server is up on http://localhost:3000")
})