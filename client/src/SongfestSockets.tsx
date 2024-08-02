import { Socket } from "socket.io-client"

export function getSongfestEmitters(socket: Socket) {
    return {
        "emitSongfestOpen": (state: boolean) => {
            socket.emit("updateSongfestOpen", state)
        },
        "emitParticipants": (state: Array<string>) => {
            socket.emit("updateParticipants", state)
        },
        "emitSongs": (state: Record<string,Array<string>>) => {
            socket.emit("updateSongs", state)
        },
        "emitSongsPerPerson":(state: number) => {
            socket.emit("updateSongsPerPerson", state)
        },
        "emitTheme":(state: string) => {
            socket.emit("updateTheme", state)
        },
        "emitGameStart":(state: boolean) => {
            socket.emit("updateGameStart", state)
        },
        "emitHost":(state: string) => {
            socket.emit("updateHost", state)
        },
        "startGame":() => {
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

