import { Player, Song } from "../../common"

interface State {
    // app
    gameInProgress: boolean
    // songfest
    songfestOpen: boolean
    theme: string
    songsPerPerson: number
    // game
    currentSong: Song | null
    phase: number
    // both
    myPlayer: Player | null
}
interface UpdateAction {
    type: "update",
    payload: Partial<State>
}
type Action = UpdateAction

function tasksReducer(state: State, action: Action) {
    switch(action.type) {
        case "update":
            return {...state, ...action.payload}
    }
    return state
}
const initialState: State = {
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
    myPlayer: null
}

export {tasksReducer, initialState}