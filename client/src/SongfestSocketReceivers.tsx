/**
 * This file contains functions for responding to Songfest-related messages from the server.
 */

import { Socket } from "socket.io-client"

export default function useSongfestReceivers(socket: Socket, songfestSetters: any) {
    const {setSongfestOpen, setParticipants, setSongs, setSongsPerPerson, setTheme, setHost} = songfestSetters

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
        console.log(`server requesting to update SongfestOpen to ${state}`)
        setSongfestOpen(state)
    })
    socket.on('updateParticipants', (state) => {
        console.log(`server requesting to update Participants to ${state}`)
        setParticipants(state)
    })
    socket.on('updateSongs', (state) => {
        console.log(`server requesting to update Songs to ${state}`)
        setSongs(state)
    })
    socket.on('updateSongsPerPerson', (state) => {
        console.log(`server requesting to update SongsPerPerson to ${state}`)
        setSongsPerPerson(state)
    })
    socket.on('updateTheme', (state) => {
        console.log(`server requesting to update Theme to ${state}`)
        setTheme(state)
    })
    socket.on('updateHost', (state) => {
        console.log(`server requesting to update Host to ${state}`)
        setHost(state)
    })
}
