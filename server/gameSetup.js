const youtubeAPI = "https://yt.lemnoslife.com/videos"
const axios = require("axios")

module.exports = {
    getSongData: async function (song) {
        // get the clip id from the url
        const clipId = song.substring(song.indexOf("clip/") + "clip/".length, (song.indexOf("?si") > -1) ? song.indexOf("?si") : song.length)
    
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
    
        // console.log("================== idData ==================")
        // console.log(idData)
        // console.log("================== clipData ==================")
        // console.log(clipData)
    
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
    },
    startGame: async (songfestStatus, gameState) => {
        const embedData = []

        // for each player
        for (const [player, songs] of Object.entries(songfestStatus.songs)) {
            // add an entry to playerScores for the player
            gameState.playerScores[player] = {
                "themeScore": 0,
                "likedScore": 0
            }

            // get the songs they submitted
            for (const song of songs) {
                // get song data for each song
                let songData = await module.exports.getSongData(song)
                songData["submitter"] = player
                embedData.push(songData)

                // add an entry to songScores for the song
                gameState.songScores[songData.clipId] = {
                    "videoId": songData.videoId,
                    "themeScore": 0,
                    "likedScore": 0,
                    "submitter": player
                }
            }
        }
        // update embedData
        gameState["songEmbedData"] = embedData
        // console.log("================== songEmbedData ==================")
        // console.log(embedData)

        // add an entry to playerNamesTaken for each player
        gameState["playerNamesTaken"] = songfestStatus.participants.map((participant) => {
            return {
                "name": participant,
                "id": null,
                "taken": false
            }
        })

        // console.log("startGame")
        // console.log(gameState)
        // console.log("startGame")

        // update gameStart

        // emit update gameStart 
    }
}