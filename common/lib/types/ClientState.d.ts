import Player from "../classes/Player";
import Song from "../classes/Song";
export default interface ClientState {
    gameInProgress: boolean;
    songfestOpen: boolean;
    theme: string;
    songsPerPerson: number;
    currentSong: Song | null;
    phase: number;
    myPlayer: Player | null;
    playerNames: Pick<Player, "name" | "taken">[];
}
