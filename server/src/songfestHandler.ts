import { Socket, Server } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { ClientToServerEvents, ServerToClientEvents, Songfest, ClientSong, Player, Song } from "../../common"


export default function registerSongfestHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>, songfestStatus: Songfest, io: Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>) {
    socket.on("cancelSongfest", () => {
        songfestStatus.songfestOpen = false
        io.emit("updateSongfestStatus", songfestStatus)
    })
    
    socket.on("getSongfestStatus", () => {
        socket.emit("updateSongfestStatus", songfestStatus)
    })
    
    socket.on("submitSongs", async (data: { 
        playerName: string
        songData: Array<Pick<ClientSong, "url"> & Partial<Omit<ClientSong, "url">>>
    }) => {
        // get the player corresponding to the playerName
        let player: Player = songfestStatus.players.find((entry) => entry.name == data.playerName)
        // if the player does not exist, make a new player with the name and add them to the list of players
        if (!player) {
            player = new Player(data.playerName)
            songfestStatus.players.push(player)
        }

        // create an array of songs from the client's input data
        const songs: Array<Song> = data.songData.map((clientSong) => {
            // if a start and end time are given, use them
            if ("startSeconds" in clientSong && "endSeconds" in clientSong) {
                const song = new Song(clientSong.url, player, clientSong.startSeconds, clientSong.endSeconds)
                return song
            }
            else {
                const song = new Song(clientSong.url, player)
                return song
            }
        })

        // initialize all songs
        songs.forEach(async (song) => {
            await song.init()
        })

        // set the player's songs equal to the newly created songs
        player.songs = songs

        // emit the updated state
        io.emit("updateSongfestStatus", songfestStatus)
    })
    
    socket.on("startSongfest", (settings: { 
        songsPerPerson: number; 
        theme: string; 
        host: string; 
    }) => {
        // set the settings
        songfestStatus.songsPerPerson = settings.songsPerPerson
        songfestStatus.theme = settings.theme
        songfestStatus.host = settings.host
        // open the songfest
        songfestStatus.songfestOpen = true
        // add the host to the list of participants
        songfestStatus.players.push(new Player(songfestStatus.host))
        io.emit("updateSongfestStatus", (songfestStatus))
    })

}