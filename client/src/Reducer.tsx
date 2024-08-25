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
        time: number,
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
            // check that myPlayer exists
            if (state.myPlayer) {
                // copy myPlayer and update song url within myPlayer
                let updatedPlayer: Player = structuredClone(state.myPlayer)
                updatedPlayer.songs[action.payload.index].url = action.payload.url
                
                return {...state, ["myPlayer"]: updatedPlayer}
            }
            else {
                return state
            }
        case "updateSongTime":
            // check if myPlayer exists and the given song time is valid
            if (state.myPlayer && action.payload.time >= 0) {
                // copy myPlayer and update song start / end time within myPlayer
                let updatedPlayer = structuredClone(state.myPlayer)
                if (action.payload.startOrEnd == "start") {
                    updatedPlayer.songs[action.payload.index].startSeconds = action.payload.time
                }
                else if (action.payload.startOrEnd == "end") {
                    updatedPlayer.songs[action.payload.index].endSeconds = action.payload.time
                }
                return {...state, ["myPlayer"]: updatedPlayer}
            }
            return state
    }
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
    playerNames: []     // used for Combobox and GameSelect
}

export {tasksReducer, initialState}
