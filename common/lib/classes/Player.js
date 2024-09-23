import Song from "./Song";
import Score from "../classes/Score";
export default class Player {
    name;
    socketId;
    taken;
    likedScore;
    themeScore;
    guessScore;
    songs;
    constructor(name, numberOfSongs) {
        this.name = name;
        this.socketId = null;
        this.taken = false;
        this.likedScore = new Score;
        this.themeScore = new Score;
        this.guessScore = 0;
        this.songs = Array(numberOfSongs).fill(new Song(name));
    }
    rateSong(song, songSubmitter, score) {
        // give score to the song and the song's submitter
        song.likedScore.add(score.liked);
        song.themeScore.add(score.theme);
        songSubmitter.likedScore.add(score.liked);
        songSubmitter.themeScore.add(score.theme);
    }
    guessSong(song, songSubmitter, guess) {
        // update guess distribution
        song.guessDistribution[guess.playerName] += 1;
        // if the player guessed correctly, give points
        if (guess.playerName == songSubmitter.name) {
            this.guessScore += 1;
            return true;
        }
        return false;
    }
}
