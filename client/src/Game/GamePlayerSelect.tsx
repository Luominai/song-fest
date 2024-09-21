import { useContext } from "react"
import { StateContext } from "../Context"
import { socket } from "../Socket"

export default function GamePlayerSelect() {
    const state = useContext(StateContext)

    return (
        <>
            <h3>Select Your Name</h3>
            <form className="playerSelect">
                {state.playerNames.map((player) => {
                    return (
                        <button
                        type="button"
                        onClick={() => {
                            socket.emit("updateSocket", player.name)
                        }}
                        disabled={player.taken}
                        >
                            {player.name}
                        </button>
                    )
                })}
            </form>
            <button
            style={{marginTop: 100}}
            type="button"
            className="nextPhase"
            disabled={state.myPlayer == null}
            onClick={() => {
                // go to the rating phase. The server will check if you are the host and have permission to press this.
                socket.emit("nextPhase")
            }}
            >
                Start
            </button>
        </>
    )
}