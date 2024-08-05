import { useContext } from "react"
import GameContext from "./GameContext"

export default function GamePlayerSelect() {
    const gameState = useContext(GameContext);
    const participants = ["jfeioab", "my name is jeff", "diddy kong"]
    return (
        <>
            <form className="playerSelect">
                {participants.map((name) => {
                    return (
                        <button>
                            {name}
                        </button>
                    )
                })}
            </form>
        </>
    )
}