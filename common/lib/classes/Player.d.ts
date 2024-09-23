import Song from "./Song";
import Score from "../classes/Score";
export default class Player {
    name: string;
    socketId: string | null;
    taken: boolean;
    likedScore: Score;
    themeScore: Score;
    guessScore: number;
    songs: Array<Song>;
    constructor(name: string, numberOfSongs: number);
    rateSong(song: Song, songSubmitter: Player, score: {
        liked: Score;
        theme: Score;
    }): void;
    guessSong(song: Song, songSubmitter: Player, guess: {
        playerName: string;
        time: number;
    }): boolean;
}
