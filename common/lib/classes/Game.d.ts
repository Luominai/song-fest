import Player from "./Player";
import Song from "./Song";
import Songfest from "./Songfest";
export default class Game {
    host: Player;
    currentSong: Song;
    currentSongSubmitter: Player;
    currentSongIndex: number;
    players: Array<Player>;
    phase: number;
    songs: Array<Song>;
    playersLockedIn: Array<string>;
    constructor();
    init(songfest: Songfest): void;
    updatePlayerSocket(player: Player, socketId: string): void;
    nextPhase(): void;
    nextSong(): void;
    shuffleSongs(): void;
}
