import ClientState from "../types/ClientState";
import Player from "./Player";
import Song from "./Song";
export default class Songfest {
    gameInProgress: boolean;
    songfestOpen: boolean;
    players: Array<Player>;
    songsPerPerson: number;
    theme: string;
    host: Player;
    songs: Array<Song>;
    currentSong: Song;
    currentSongSubmitter: Player;
    currentSongIndex: number;
    phase: number;
    playersLockedIn: Array<string>;
    constructor();
    startGame(): void;
    nextPhase(): void;
    nextSong(): boolean;
    shuffleSongs(): void;
    toClientState(): Omit<ClientState, "myPlayer">;
    reset(): void;
}
