import Player from "./Player"
import Score from "./Score"

export default interface Song {
    url: string
    videoId: string
    startSeconds: number
    endSeconds: number
    clipId: string
    submitter: Player 
    themeScore: Score
    likedScore: Score
}