/**
 * This file contains the type definition and default values for the SongfestStatusContext used by Songfest.tsx
 * The interface is needed for autocomplete to give you the names of all the included attributes.
 * The defaults are there so Typescript doesn't complain that an attribute may be null. 
 * The defaults get overridden since Songfest.tsx defines values for all fields when using the context
 */

import { createContext } from "react";
import {ClientSongfest, ClientToServerEvents} from "../../../common"

interface SongfestStatus {
    state: ClientSongfest | null
    emitFunctions: Pick<
        ClientToServerEvents, 
        "getSongfestStatus" | "submitSongs" | "startSongfest" | "cancelSongfest" | "startGame"
    >
    songsProcessed: boolean
}

const SongfestContext = createContext<SongfestStatus | null>(null)

export default SongfestContext
