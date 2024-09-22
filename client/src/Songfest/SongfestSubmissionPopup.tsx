/**
 * This renders a form containing information about the player's name, and the songs they want to submit.
 * On submit, this updates the corresponding variables in Songfest.tsx as well as serverside in index.js 
 */

import { useContext, useEffect, useRef, useState } from "react"
import { ClientState } from "../../../common"
import { DispatchContext, StateContext } from "../Context"
import { socket } from "../Socket"
import PlayerNameCombobox from "../Components/PlayerNameCombobox"

function SongfestSubmissionPopup({onClose}: {onClose: any}) {
    const state = useContext(StateContext)
    const dispatch = useContext(DispatchContext)
    const [playerName, setPlayerName] = useState<string | null>(null)
    const [startTimeInput, setStartTimeInput] = useState(Array(state.songsPerPerson).fill("00:00.00"))
    const [endTimeInput, setEndTimeInput] = useState(Array(state.songsPerPerson).fill("00:15.00"))
    const [submitButtonLabel, setSubmitButtonLabel] = useState("Submit")

    const timerId = useRef<any>(null)
    const time = useRef<number>(0)

    useEffect(() => {
        // set the timeInput when 
        function setTimeInputs(newState: Partial<ClientState>) {
            if (newState.myPlayer) {
                console.log(newState.myPlayer)
                // dispatch({type: "update", payload: {myPlayer: newState.myPlayer}})
                setStartTimeInput(newState.myPlayer.songs.map((song) => secondsToTimeStamp(song.startSeconds)))
                setEndTimeInput(newState.myPlayer.songs.map((song) => secondsToTimeStamp(song.endSeconds)))
            }
        }
        function onEndProcessingSongs() {
            setSubmitButtonLabel("Done!")
            time.current = 3000
            timerId.current = setInterval(() => {
                time.current -= 100
                if (time.current <= 0) {
                    setSubmitButtonLabel("Submit")
                    if (timerId.current) {
                        clearInterval(timerId.current)
                    }
                }
            }, 100)
        }
        socket.on("updateState", setTimeInputs)
        socket.on("endProcessingSongs", onEndProcessingSongs)
        return () => {
            socket.off("updateState", setTimeInputs)
            socket.off("endProcessingSongs", onEndProcessingSongs)
            if (timerId.current) {
                clearInterval(timerId.current)
            }
        }
    }, [socket])

    return (
        <>
            <form className='popup'>
                {/* The X button on the popup */}
                <button style={{float: 'right'}} 
                className="closeSubmissionModal"
                onClick={() => {
                    onClose()
                    dispatch({type: "update", payload: {myPlayer: null}})
                }}>&times;</button>
                <br></br> <br></br>

                <PlayerNameCombobox onChange={(value: string | null) => {
                    setPlayerName(value)
                    if (value != null) {
                        console.log(value)
                        socket.emit("getPlayerByName", value)
                    }
                }} enableDynamicOption/>
                <br></br> <br></br>

                {/* create inputs for song urls. the number of inputs is determined by SongfestStatus.songsPerPerson */}
                {Array.from({length: state.songsPerPerson}).map((_, index) => {
                    return (
                        <>
                        <div key={"song" + (index + 1)}>
                            <label htmlFor={"song" + (index + 1)}>Song {index + 1}:</label> <br></br>
                            <input type="text" 
                            autoComplete="off"
                            id={"song" + (index + 1)}
                            className={"url" + (index + 1)}
                            // fill the input with the url of the song, if the user has previously submitted 
                            value={state.myPlayer?.songs[index]?.url ?? ""}
                            // when a change is made to the input, the songs state is updated accordingly
                            onChange={(event) => dispatch({type: "updateSongUrl", payload: {url: event.target.value, index: index}})}
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "center", marginTop: "3px"}}>
                            <input 
                            autoComplete="off"
                            type="text"
                            style={{display: "inline", width: "30%", marginRight: "1px", textAlign: "center"}} 
                            value={startTimeInput}
                            className={"startTime" + (index + 1)}
                            onChange={(event) => {
                                //@ts-ignore
                                setStartTimeInput((input) => input.with(index, event.target.value))
                                dispatch({type: "updateSongTime", payload: {time: timeStampToSeconds(event.target.value), startOrEnd: "start", index: index}})}
                            }/>

                            <span style={{margin: "auto 2px"}}> to </span>

                            <input 
                            autoComplete="off"
                            type="text"
                            style={{display: "inline", width: "30%", marginLeft: "1px", textAlign: "center"}} 
                            className={"endTime" + (index + 1)}
                            value={endTimeInput}
                            onChange={(event) => {
                                //@ts-ignore
                                setEndTimeInput((input) => input.with(index, event.target.value))
                                dispatch({type: "updateSongTime", payload: {time: timeStampToSeconds(event.target.value), startOrEnd: "end", index: index}})}
                            }/>
                        </div>
                        </>
                    )
                })}
                <br></br>

                <center>
                    <button 
                    className="submitSongs"
                    type="button" 
                    onClick={() => {
                        if (!state.myPlayer) {
                            return
                        }

                        const songsValid = state.myPlayer.songs.every((song) => {
                            return validateYouTubeUrl(song.url) && song.startSeconds >= 0 && song.endSeconds >=0
                        })

                        if (playerName != null && songsValid) {
                            // socket.emit("submitSongs", {
                            //     playerName: playerName,
                            //     songData: state.myPlayer.songs
                            // })
                            socket.emit("submitSongs", state.myPlayer)
                        }
                    }}>
                        {submitButtonLabel}
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

