import Score from "../types/Score"
import axios from "axios"
import getYoutubeId from "get-youtube-id"
import Player from "./Player"

const youtubeAPI = "https://yt.lemnoslife.com/videos"

export default class Song {
    constructor(url: string, submitterName: string, startSeconds?: number, endSeconds?: number) {
        this.url = url
        this.submitterName = submitterName
        this.themeScore = {
            low: 0,
            mid: 0,
            high: 0,
            total: 0
        }
        this.likedScore = {
            low: 0,
            mid: 0,
            high: 0,
            total: 0
        }
        if (startSeconds && endSeconds) {
            this.startSeconds = startSeconds
            this.endSeconds = endSeconds
        }
        this.guessDistribution = {}
    }

    url: string
    videoId: string
    startSeconds: number
    endSeconds: number
    clipId: string
    submitterName: string
    themeScore: Score
    likedScore: Score
    guessDistribution: Record<string,number>
    
    async init() {
        // if the url is a clip, use the youtube operational api to get necessary information
        if (this.url.includes("clip/")) {
            const data = await this.getSongData()
            this.videoId = data.videoId
            this.startSeconds = data.startSeconds
            this.endSeconds = data.endSeconds
            this.clipId = this.makeid(11)
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
        this.themeScore.low += value.low
        this.themeScore.mid += value.mid
        this.themeScore.high += value.high
        if ("total" in value) {
            this.themeScore.total += value.total
        }
    }

    addToLikedScore(value: Score | Omit<Score, "total">) {
        this.likedScore.low += value.low
        this.likedScore.mid += value.mid
        this.likedScore.high += value.high
        if ("total" in value) {
            this.likedScore.total += value.total
        }
    }
}