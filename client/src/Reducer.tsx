import { ClientState, Player, Song } from "../../common"

interface UpdateAction {
    type: "update",
    payload: Partial<ClientState>
}
interface UpdateSongUrlAction {
    type: "updateSongUrl",
    payload: {
        url: string,
        index: number
    }
}
interface UpdateSongTimeAction {
    type: "updateSongTime",
    payload: {
        timestamp: string,
        startOrEnd: "start" | "end",
        index: number
    }
}
type Action = UpdateAction | UpdateSongUrlAction | UpdateSongTimeAction
// function updateTime(index: number, type: "start"|"end", timestamp: string) {
    //     let copy = [...songData]
    //     const seconds = timeStampToSeconds(timestamp)
    //     if (type == "start") {
    //         copy[index].startTimeInput = timestamp
    //         if (seconds >= 0) {
    //             copy[index].startSeconds = seconds
    //         }
    //     }
    //     else if (type == "end") {
    //         copy[index].endTimeInput = timestamp
    //         if (seconds >= 0) {
    //             copy[index].endSeconds = seconds
    //         }
    //     }
    //     setSongData(copy)
    // }
function tasksReducer(state: ClientState, action: Action) {
    switch(action.type) {
        case "update":
            return {...state, ...action.payload}
        case "updateSongUrl":
            if (state.myPlayer) {
                let updatedSongs: Song[] = [...state.myPlayer.songs]
                updatedSongs[action.payload.index].url = action.payload.url

                let updatedPlayer: Player = structuredClone(state.myPlayer)
                updatedPlayer.songs = updatedSongs
                
                return {...state, ["myPlayer"]: updatedPlayer}
            }
            else {
                return state
            }
        case "updateSongTime":
            if (state.myPlayer) {
                
            }
    }
    return state
}
const initialState: ClientState = {
    // app
    gameInProgress: false,
    // songfest
    songfestOpen: false,
    theme: "",
    songsPerPerson: 1,
    // game
    currentSong: null,
    phase: -1,
    // both
    myPlayer: null,
    playerNames: []
}

export {tasksReducer, initialState}
