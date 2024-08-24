/**
 * This renders a form containing information about the player's name, and the songs they want to submit.
 * On submit, this updates the corresponding variables in Songfest.tsx as well as serverside in index.js 
 */

import { useContext, useState } from "react"
import { ClientSong } from "../../../common"
import { StateContext } from "../Context"
import { socket } from "../Socket"
import PlayerNameCombobox from "../Components/PlayerNameCombobox"

type SongData = ClientSong & {startTimeInput: string, endTimeInput: string}

const initialSong: SongData = {
    url: "",
    startSeconds: 0,
    endSeconds: 15,
    startTimeInput: "00:00.00",
    endTimeInput: "00:15.00"
}

function SongfestSubmissionPopup({onClose}: {onClose: any}) {
    const state = useContext(StateContext)
    const [playerName, setPlayerName] = useState<string | null>(null)
    const [songData, setSongData] = useState<SongData[]>(
        Array(state.songsPerPerson).fill(initialSong)
    )

    function updateTime(index: number, type: "start"|"end", timestamp: string) {
        let copy = [...songData]
        const seconds = timeStampToSeconds(timestamp)
        if (type == "start") {
            copy[index].startTimeInput = timestamp
            if (seconds >= 0) {
                copy[index].startSeconds = seconds
            }
        }
        else if (type == "end") {
            copy[index].endTimeInput = timestamp
            if (seconds >= 0) {
                copy[index].endSeconds = seconds
            }
        }
        setSongData(copy)
    }

    return (
        <>
            <form className='popup'>
                {/* The X button on the popup */}
                <button style={{float: 'right'}} onClick={onClose}>&times;</button>
                <br></br> <br></br>

                <PlayerNameCombobox onChange={(value: string) => {
                    setPlayerName(value)
                    socket.emit("getPlayerByName", value)
                }} enableDynamicOption/>
                <br></br> <br></br>

                {/* create inputs for song urls. the number of inputs is determined by SongfestStatus.songsPerPerson */}
                {Array(state.songsPerPerson).map((_, index) => {
                    return (
                        <>
                        <div key={"song" + (index + 1)}>
                            <label htmlFor={"song" + (index + 1)}>Song {index + 1}:</label> <br></br>
                            {/* fill the input with the url of the song, if the user has previously submitted */}
                            <input type="text" value={state.myPlayer?.songs[index].url ?? ""} id={"song" + (index + 1)}
                            // when a change is made to the input, the songs state is updated accordingly
                            onChange={(event) => {
                                let copy = [...songData]
                                copy[index].url = event.target.value
                                setSongData(copy)
                            }}
                            ></input>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", marginTop: "3px"}}>
                            <input 
                            type="text"
                            style={{display: "inline", width: "30%", marginRight: "1px", textAlign: "center"}} 
                            value={songData[index].startTimeInput}
                            onChange={(event) => updateTime(index, "end", event.target.value)}/>

                            <span style={{margin: "auto 2px"}}> to </span>

                            <input 
                            type="text"
                            style={{display: "inline", width: "30%", marginLeft: "1px", textAlign: "center"}} 
                            value={songData[index].endTimeInput}
                            onChange={(event) => updateTime(index, "end", event.target.value)}/>
                        </div>
                        </>
                    )
                })}
                <br></br>

                <center>
                    <button type="button" onClick={() => {
                        const songsValid = songData.every((song) => {
                            return validateYouTubeUrl(song.url) && song.startSeconds >= 0 && song.endSeconds >=0
                        })

                        if (playerName != null && songsValid) {
                            socket.emit("submitSongs", {
                                playerName: playerName,
                                songData: songData
                            })
                        }
                    }}>
                        Submit
                    </button>
                </center>
            </form>
        </>
    )
}

function validateYouTubeUrl(url: string)
{
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            // Do anything for being valid
            return true
        }
        else {
            // Do anything for not being valid
            return false
        }
    }
}

function timeStampToSeconds(timestamp: string) {
    if (timestamp.match(/^([0-9]:|0[0-9]:|[0-5][0-9]:)?[0-5][0-9](.[0-9][0-9]|.[0-9])?$/) == null) {
        return -1
    }

    const timeUnits = timestamp.split(":")
    let multiplier = 1
    let time = 0
    
    while(timeUnits.length > 0) {
        time += multiplier * parseFloat(timeUnits[timeUnits.length - 1])
        timeUnits.pop()
        multiplier *= 60
    }
    return time
}

function secondsToTimeStamp(timeInSeconds: number) {
    // convert to string
    const string = timeInSeconds.toString()
    // split by decimal
    const splitString = string.split(".")
    // get the portions
    let integerPart: number = parseInt(splitString[0])
    let decimalPart: string = (splitString.length > 1) ? `.${splitString[1]}` : ""

    // convert the integer part to a timestamp
    const minutes = Math.floor(integerPart / 60)
    const seconds = integerPart % 60
    const timeStamp = `${minutes}:${seconds.toString().padStart(2, "0")}` + decimalPart

    return timeStamp
}

export default SongfestSubmissionPopup