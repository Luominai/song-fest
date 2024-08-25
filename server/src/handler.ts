import { Socket, Server } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { ClientToServerEvents, ServerToClientEvents, Songfest, ClientSong, Player, Song } from "../../common"


export default function registerHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>, songfest: Songfest, io: Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>) {
    socket.on("getState", () => {
        console.log("sending state", songfest.toClientState())
        socket.emit("updateState", songfest.toClientState())
    })
    socket.on("startSongfest", (settings: { 
        songsPerPerson: number; 
        theme: string; 
        host: string; 
    }) => {
        // set the settings
        songfest.songsPerPerson = settings.songsPerPerson
        songfest.theme = settings.theme
        songfest.host = new Player(settings.host, settings.songsPerPerson)
        // open the songfest
        songfest.songfestOpen = true
        // add the host to the list of participants
        songfest.players.push(songfest.host)

        // console.dir(songfest, {depth: null})
        io.emit("updateState", songfest.toClientState())
    })
    socket.on("getPlayerByName", (name: string) => {
        let player = songfest.players.find((entry) => entry.name == name)
        if (!player) {
            player = new Player(name, songfest.songsPerPerson)
            songfest.players.push(player)
            // update the state for everyone
            io.emit("updateState", songfest.toClientState())
        }
        // give the client the player they're looking for
        socket.emit("updateState", {myPlayer: player})
    })
    socket.on("submitSongs", async (data: Player) => {
        // find the player in songfest.players
        const player = songfest.players.find((entry) => entry.name == data.name)
        // initialize the songs in player using the given data
        const songPromises: Promise<void>[] = player.songs.map((song: Song, index: number) => {
            return song.init(data.songs[index].url, data.name, data.songs[index].startSeconds, data.songs[index].endSeconds)
        })
        await Promise.all(songPromises).then((_) => {
            console.dir(player.songs)
            socket.emit("endProcessingSongs")
        })
    })
}