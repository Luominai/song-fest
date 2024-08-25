import Score from "../types/Score"
import axios from "axios"
import getYoutubeId from "get-youtube-id"
import youtubeApiKey from "../apiKey"

// const youtubeAPI = "https://yt.lemnoslife.com/videos"
const youtubeApi = "https://www.googleapis.com/youtube/v3/videos"

export default class Song {
    url: string
    videoId: string
    startSeconds: number
    endSeconds: number
    clipId: string
    submitterName: string
    themeScore: Score
    likedScore: Score
    guessDistribution: Record<string,number>
    title: string
    thumbnail: string

    initialized: boolean

    constructor(submitterName: string) {
        this.url = ""
        this.submitterName = submitterName
        this.startSeconds = 0
        this.endSeconds = 0
        this.initialized = false
    }
    
    async init(url: string, submitterName: string, startSeconds: number, endSeconds: number) {
        this.url = url
        this.submitterName = submitterName
        this.startSeconds = startSeconds
        this.endSeconds = endSeconds
        this.videoId = getYoutubeId(url)
        this.clipId = this.makeid(11)
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
        this.guessDistribution = {}
        this.getSongData()
        this.initialized = true
    }

    private async getSongData() {
        // make requests to Youtube Operational API to get the video Id and start/end times
        const response = await axios.get(youtubeApi, {
            params: {
                id: this.videoId,
                part: "snippet",
                fields: "items(snippet(title,thumbnails(default)))",
                key: youtubeApiKey
            }
        })
        
        // get data
        const data = response.data
    
        // get specific parts of data
        this.title = data.items[0].snippet.title
        this.thumbnail = data.items[0].snippet.thumbnails.default.url
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