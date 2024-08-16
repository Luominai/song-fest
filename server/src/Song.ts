import Score from "./types/Score"
import axios from "axios"
import getYoutubeId from "get-youtube-id"
import Player from "./Player"

const youtubeAPI = "https://yt.lemnoslife.com/videos"

export default class Song {
    constructor(url: string, submitter: Player, startSeconds?: number, endSeconds?: number) {
        this.url = url
        this.submitter = submitter
        if (startSeconds && endSeconds) {
            this.startSeconds = startSeconds
            this.endSeconds = endSeconds
        }
    }

    private _url: string
    public get url(): string {
        return this._url
    }
    public set url(value: string) {
        this._url = value
    }

    private _videoId: string
    public get videoId(): string {
        return this._videoId
    }
    public set videoId(value: string) {
        this._videoId = value
    }

    private _startSeconds: number
    public get startSeconds(): number {
        return this._startSeconds
    }
    public set startSeconds(value: number) {
        this._startSeconds = value
    }

    private _endSeconds: number
    public get endSeconds(): number {
        return this._endSeconds
    }
    public set endSeconds(value: number) {
        this._endSeconds = value
    }

    private _clipId: string
    public get clipId(): string {
        return this._clipId
    }
    public set clipId(value: string) {
        this._clipId = value
    }

    private _submitter: Player
    public get submitter(): Player {
        return this._submitter
    }
    public set submitter(value: Player) {
        this._submitter = value
    }

    private _themeScore: Score
    public get themeScore(): Score {
        return this._themeScore
    }
    public set themeScore(value: Score) {
        this._themeScore = value
    }

    private _likedScore: Score
    public get likedScore(): Score {
        return this._likedScore
    }
    public set likedScore(value: Score) {
        this._likedScore = value
    }
    
    async init() {
        // if the url is a clip, use the youtube operational api to get necessary information
        if (this.url.includes("clip/")) {
            const data = await this.getSongData()
            this.videoId = data.videoId
            this.startSeconds = data.startSeconds
            this.endSeconds = data.endSeconds
            this.clipId = this.clipId
        }
        else {
            const videoId = getYoutubeId(this.url)
            this.videoId = videoId
            this.clipId = this.makeid(11)
        }
    }

    private async getSongData() {
        // get the clip id from the url
        const clipId = this.url.substring(
            this.url.indexOf("clip/") + "clip/".length, 
            (this.url.indexOf("?si") > -1) ? this.url.indexOf("?si") : this.url.length
        )
    
        // make requests to Youtube Operational API to get the video Id and start/end times
        const response = await axios.all([
            axios.get(youtubeAPI, {
                params: {
                    part: "id",
                    clipId: clipId
                }
            }),
            axios.get(youtubeAPI, {
                params: {
                    part: "clip",
                    clipId: clipId
                }
            }),
        ])
        
        // get data
        const idData = response[0].data
        const clipData = response[1].data
    
        // get specific parts of data
        const startSeconds = clipData.items[0]?.clip?.startTimeMs / 1000
        const endSeconds = clipData.items[0]?.clip?.endTimeMs / 1000
        const videoId = idData.items[0]?.videoId
    
        return {
            "videoId": videoId,
            "startSeconds": startSeconds,
            "endSeconds": endSeconds,
            "clipId": clipId,
        }
    }

    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    private makeid(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    addToThemeScore(value: Score | Omit<Score, "total">) {
        this._themeScore.low += value.low
        this._themeScore.mid += value.mid
        this._themeScore.high += value.high
        if ("total" in value) {
            this._themeScore.total += value.total
        }
    }

    addToLikedScore(value: Score | Omit<Score, "total">) {
        this._likedScore.low += value.low
        this._likedScore.mid += value.mid
        this._likedScore.high += value.high
        if ("total" in value) {
            this._likedScore.total += value.total
        }
    }
}