import { useContext } from "react"
import GameContext from "./GameContext"
import PlayerName from "./types/PlayerName";

export default function GamePlayerSelect({playerNames}: {playerNames: Array<PlayerName>}) {
    const gameState = useContext(GameContext);
    // const participants = [
    //     {"name": "jfeioab", "id": "aaaaaaa", "taken": true},
    //     {"name": "my name is jeff", "id": null, "taken": false},
    //     {"name": "diddy kong", "id": null, "taken": false}
    // ]

    return (
        <>
            <h3>Select Your Name</h3>
            <form className="playerSelect">
                {playerNames.map((playerName) => {
                    return (
                        <button
                        type="button"
                        onClick={() => {
                            gameState.setPlayer(playerName.name)
                        }}
                        disabled={playerName.taken}
                        >
                            {playerName.name}
                        </button>
                    )
                })}
            </form>
            <button
            type="button"
            disabled={gameState.player != gameState.host}
            onClick={() => {
                // go to the rating phase. The server will check if you are the host and have permission to press this.
                gameState.setPhase(0)
            }}
            >
                Start
            </button>
        </>
    )
}