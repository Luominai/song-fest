import { useContext } from "react"
import { StateContext } from "../Context"
import SongfestOpen from "./SongfestOpen"
import SongfestClosed from "./SongfestClosed"

function SongfestApp() {
    const state = useContext(StateContext)

    if (state.songfestOpen) {
        return <SongfestOpen/>
    }
    else {
        return <SongfestClosed/>
    }
}

export default SongfestApp