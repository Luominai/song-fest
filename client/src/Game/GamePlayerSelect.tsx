import { useContext } from "react"
import GameContext from "./GameContext"

export default function GamePlayerSelect() {
    const gameState = useContext(GameContext);

    return (
        <>
            <h3>Select Your Name</h3>
            <form className="playerSelect">
                {gameState?.state?.players.map((player) => {
                    return (
                        <button
                        type="button"
                        onClick={() => {
                            gameState?.emitFunctions.registerSocketToPlayer(player.name)
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
            disabled={gameState?.myPlayer == null || gameState?.myPlayer.name != gameState?.state?.host.name}
            onClick={() => {
                // go to the rating phase. The server will check if you are the host and have permission to press this.
                gameState?.emitFunctions.nextPhase()
            }}
            >
                Start
            </button>
        </>
    )
}