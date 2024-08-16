/**
 * This file contains the type definition and default values for the SongfestStatusContext used by Songfest.tsx
 * The interface is needed for autocomplete to give you the names of all the included attributes.
 * The defaults are there so Typescript doesn't complain that an attribute may be null. 
 * The defaults get overridden since Songfest.tsx defines values for all fields when using the context
 */

import { createContext } from "react";
import {ClientSongfest, ClientToServerEvents} from "../../common"

interface SongfestStatus {
    state: ClientSongfest
    emitFunctions: ClientToServerEvents
}

const SongfestContextDefault = {
    state: {
        songfestOpen: false,
        players: [],
        songsPerPerson: 1,
        theme: "",
        host: ""
    },
    emitFunctions: {
        getSongfestStatus: () => {},
        submitSongs: () => {},
        startSongfest: () => {},
        startGame: () => {},
        nextPhase: () => {},
        nextSong: () => {},
        registerSocketToPlayer: () => {},
        rateSong: () => {},
        guessSongSubmitter: () => {},
        cancelSongfest: () => {}
    }
}

const SongfestContext = createContext<SongfestStatus>(SongfestContextDefault)

export {SongfestContext, SongfestContextDefault}
