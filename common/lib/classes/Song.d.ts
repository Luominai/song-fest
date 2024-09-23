import Score from "../classes/Score";
export default class Song {
    url: string;
    videoId: string;
    startSeconds: number;
    endSeconds: number;
    clipId: string;
    submitterName: string;
    themeScore: Score;
    likedScore: Score;
    guessDistribution: Record<string, number>;
    title: string;
    thumbnail: string;
    initialized: boolean;
    constructor(submitterName: string);
    init(url: string, startSeconds: number, endSeconds: number): Promise<void>;
    private getSongData;
    private makeid;
}
