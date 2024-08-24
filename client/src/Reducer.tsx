import { ClientState } from "../../common"

interface UpdateAction {
    type: "update",
    payload: Partial<ClientState>
}
type Action = UpdateAction

function tasksReducer(state: ClientState, action: Action) {
    switch(action.type) {
        case "update":
            return {...state, ...action.payload}
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