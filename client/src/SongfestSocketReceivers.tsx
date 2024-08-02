import { Socket } from "socket.io-client"

export default function useSongfestReceivers(socket: Socket, songfestSetters: any) {
    const {setSongfestOpen, setParticipants, setSongs, setSongsPerPerson, setTheme, setHost} = songfestSetters

    socket.on("connect", () => {
        const sessionId = socket.id
        console.log(sessionId)
        socket.emit("getSongfestStatus", sessionId)
    })
    socket.on("receiveSongfestStatus", (serverSongfestStatus) => {
        console.log(serverSongfestStatus)
        // update all state variables
        setSongfestOpen(serverSongfestStatus.songfestOpen)
        setParticipants(serverSongfestStatus.participants)
        setSongs(serverSongfestStatus.songs)
        setSongsPerPerson(serverSongfestStatus.songsPerPerson)
        setTheme(serverSongfestStatus.theme)
    })

    socket.on('updateSongfestOpen', (state) => {
        setSongfestOpen(state)
    })
    socket.on('updateParticipants', (state) => {
        setParticipants(state)
    })
    socket.on('updateSongs', (state) => {
        setSongs(state)
    })
    socket.on('updateSongsPerPerson', (state) => {
        setSongsPerPerson(state)
    })
    socket.on('updateTheme', (state) => {
        setTheme(state)
    })
    socket.on('updateHost', (state) => {
        setHost(state)
    })
}
