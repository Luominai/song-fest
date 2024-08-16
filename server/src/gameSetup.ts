import axios from "axios"
const youtubeAPI = "https://yt.lemnoslife.com/videos"

module.exports = {
    getSongData: async function (song: string) {
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
        // copy participants from songfestStatus
        gameState.participants = songfestStatus.participants
        // copy host from songfestStatus
        gameState.host = songfestStatus.host
        // get the embed data for every song
        for (const [player, songs] of Object.entries(songfestStatus.songs)) {
            // add an entry to playerScores for each player
            gameState.playerScores.push({
                "themeScore": 0,
                "likedScore": 0,
                "playerName": player
            })

            // get the songs they submitted
            for (const song of songs) {
                // get song data for each song
                let songData = await module.exports.getSongData(song)
                songData["submitter"] = player
                gameState.songEmbedData.push(songData)

                // add an entry to songScores for each song
                gameState.songScores.push({
                    "videoId": songData.videoId,
                    "clipId": songData.clipId,
                    "themeScore": 0,
                    "likedScore": 0,
                    "submitter": player,
                    "themeDistribution": {
                        "low": 0,
                        "mid": 0,
                        "high":0
                    },
                    "likedDistribution": {
                        "low": 0,
                        "mid": 0,
                        "high":0
                    }
                })
            }
        }

        // add an entry to playerNamesTaken for each player
        gameState.playerNamesTaken = songfestStatus.participants.map((participant) => {
            return {
                "name": participant,
                "id": null,
                "taken": false
            }
        })

        // shuffle songs
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        function shuffle(array) {
            let currentIndex = array.length;
          
            // While there remain elements to shuffle...
            while (currentIndex != 0) {
          
              // Pick a remaining element...
              let randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
        }
        shuffle(gameState.songEmbedData)

        // set the first song
        gameState.currentSong = gameState.songEmbedData[gameState.currentSongIndex]
        gameState.currentSongSubmitter = gameState.currentSong.submitter
    }
}