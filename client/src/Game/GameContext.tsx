/**
 * This file contains the type definition and default values for the GameContext used by Game.tsx
 * The interface is needed for autocomplete to give you the names of all the included attributes.
 * The defaults are there so Typescript doesn't complain that an attribute may be null. 
 * The defaults get overridden since Game.tsx defines values for all fields when using the context
 */

import { createContext } from "react";
import { ClientGame, ClientToServerEvents, Player } from "../../../common";

interface GameStatus {
    state: ClientGame | null
    emitFunctions: Pick<
        ClientToServerEvents, 
        "nextPhase" | "nextSong" | "registerSocketToPlayer" | "rateSong" | "guessSongSubmitter"
    >
    myPlayer: Player | null
}

const GameContext = createContext<GameStatus | null>(null)

export default GameContext
