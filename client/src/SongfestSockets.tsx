import { Socket } from "socket.io-client"

export function getSongfestEmitters(socket: Socket) {
    return {
        "emitSongfestOpen": (state: boolean) => {
            console.log(`asking server to update SongfestOpen to ${state}`)
            socket.emit("updateSongfestOpen", state)
        },
        "emitParticipants": (state: Array<string>) => {
            console.log(`asking server to update Participants to ${state}`)
            socket.emit("updateParticipants", state)
        },
        "emitSongs": (state: Record<string,Array<string>>) => {
            console.log(`asking server to update Songs to ${state}`)
            socket.emit("updateSongs", state)
        },
        "emitSongsPerPerson":(state: number) => {
            console.log(`asking server to update SongsPerPerson to ${state}`)
            socket.emit("updateSongsPerPerson", state)
        },
        "emitTheme":(state: string) => {
            console.log(`asking server to update Theme to ${state}`)
            socket.emit("updateTheme", state)
        },
        "emitGameStart":(state: boolean) => {
            console.log(`asking server to update GameStart to ${state}`)
            socket.emit("updateGameStart", state)
        },
        "emitHost":(state: string) => {
            console.log(`asking server to update Host to ${state}`)
            socket.emit("updateHost", state)
        },
        "startGame":() => {
            console.log(`asking server to start the game`)
            socket.emit("startGame")
        }
    }
}

export function useSongfestReceivers(socket: Socket, songfestSetters: any) {
    const {setSongfestOpen, setParticipants, setSongs, setSongsPerPerson, setTheme, setGameStart, setHost} = songfestSetters

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
    socket.on('updateGameStart', (state) => {
        setGameStart(state)
    })
    socket.on('updateHost', (state) => {
        setHost(state)
    })
}

