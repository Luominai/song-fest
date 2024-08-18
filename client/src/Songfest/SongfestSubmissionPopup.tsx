/**
 * This renders a form containing information about the player's name, and the songs they want to submit.
 * On submit, this updates the corresponding variables in Songfest.tsx as well as serverside in index.js 
 */

import { useContext, useEffect, useState } from "react"
import SongfestContext from "./SongfestContext"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"
import { ClientSong } from "../../../common"

function SongfestSubmissionPopup({onClose}: {onClose: any}) {
    const SongfestStatus = useContext(SongfestContext)
    const [playerName, setPlayerName] = useState<string | null>(null)
    const [query, setQuery] = useState<string>("")
    
    const initialSong = {
        url: "",
        startSeconds: 0,
        endSeconds: 15,
        startTimeInput: "00:00.00",
        endTimeInput: "00:00.00"
    }
    const initialSongData = Array(SongfestStatus?.state?.songsPerPerson).fill(initialSong)
    const [songData, setSongData] = useState<Array<ClientSong & {startTimeInput: string, endTimeInput: string}>>(initialSongData)

    // when playerName changes, update the songData to reflect previously submitted data
    useEffect(() => {
        const songs = SongfestStatus?.state?.players.find((entry) => entry.name == playerName)?.songs
        if (!songs || songs.length == 0) {
            return
        }
        const songData = songs.map((song) => {
            return {
                url: song.url,
                startSeconds: song.startSeconds,
                endSeconds: song.endSeconds,
                startTimeInput: secondsToTimeStamp(song.startSeconds),
                endTimeInput: secondsToTimeStamp(song.endSeconds)
            }
        })
        setSongData(songData)
        
    }, [playerName])

    if (SongfestStatus?.state == null) {
        return
    }

    return (
        <>
            <form className='popup'>
                {/* info about the combobox here: https://headlessui.com/react/combobox */}
                {/* the combobox is connected to the participant state variable and updates it when an option is selected */}
                {/* the combobox also sets the query to "" when closing the box (clears the text)*/}
                
                {/* The X button on the popup */}
                <button style={{float: 'right'}} onClick={onClose}>&times;</button>
                <br></br> <br></br>

                <p>Name:</p>
                <Combobox value={playerName} onChange={(value) => {
                    // set the participant
                    setPlayerName(value)
                }} onClose={() => setQuery("")} immediate>
                    {/* the query state variable updates to match what the user types */}
                    <ComboboxInput onChange={(event) => setQuery(event.target.value)} displayValue={(person: string) => person}/>
                    <ComboboxOptions anchor="bottom start" className=" group border-[3px] border-[#676BC9] bg-[#676BC9] rounded-lg w-[var(--input-width)] text-center [--anchor-gap:3px] scrollbar empty:invisible [--anchor-max-height:80px] hover:text-white">
                        {/* dynamically create an option based off what the user is typing. */}
                        {/* this option will show if the query is not whitespace and if the query does not match an existing participant*/}
                        {query.trim().length > 0 && !SongfestStatus.state?.players.map((entry) => entry.name).includes(query) && (
                        <ComboboxOption value={query} className="bg-[#A6B5EA] hover:bg-[#6f71b2]">
                            Create <span className="font-bold">"{query}"</span>
                        </ComboboxOption>
                        )}

                        {// filter the list of participants using the query
                        SongfestStatus.state?.players.filter((person) => {
                            return person.name.toLowerCase().includes(query.toLowerCase())
                        })
                        // for every participant remaining, create an option for them in the combobox
                        .map((person, index) => (
                            <ComboboxOption value={person.name} key={index} className="bg-[#A6B5EA] hover:bg-[#6f71b2]">
                                {person.name}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
                <br></br> <br></br>

                {/* create inputs for song urls. the number of inputs is determined by SongfestStatus.songsPerPerson */}
                {Array.from({length: SongfestStatus.state?.songsPerPerson ?? 0}).map((_, index) => {
                    return (
                        <>
                        <div key={"song" + (index + 1)}>
                            <label htmlFor={"song" + (index + 1)}>Song {index + 1}:</label> <br></br>
                            {/* fill the input with the url of the song, if the user has previously submitted */}
                            <input type="text" value={songData[index]?.url ?? ""} id={"song" + (index + 1)}
                            // when a change is made to the input, the songs state is updated accordingly
                            onChange={(event) => {
                                let copy = [...songData]
                                copy[index].url = event.target.value
                                console.log(copy)
                                setSongData(copy)
                            }}
                            ></input>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", marginTop: "3px"}}>
                            <input 
                            type="text"
                            style={{display: "inline", width: "30%", marginRight: "1px", textAlign: "center"}} 
                            value={songData[index].startTimeInput}
                            onChange={(event) => {
                                // update input
                                let copy = [...songData]
                                copy[index].startTimeInput = event.target.value

                                // if input is valid, also update the start time
                                const start = timeStampToSeconds(event.target.value)
                                if (start >= 0) {
                                    copy[index].startSeconds = start
                                }
                                console.log(copy)
                                setSongData(copy)
                            }}
                            />
                            <span style={{margin: "auto 2px"}}> to </span>
                            <input 
                            type="text"
                            style={{display: "inline", width: "30%", marginLeft: "1px", textAlign: "center"}} 
                            value={songData[index].endTimeInput}
                            onChange={(event) => {
                                // update input
                                let copy = [...songData]
                                copy[index].endTimeInput = event.target.value

                                // if input is valid, also update the end time
                                const end = timeStampToSeconds(event.target.value)
                                if (end >= 0) {
                                    copy[index].endSeconds = end
                                }
                                console.log(copy)
                                setSongData(copy)
                            }}
                            />
                        </div>
                        </>
                    )
                })}
                <br></br>

                <center>
                <button type="button" disabled={!SongfestStatus.songsProcessed} onClick={() => {
                    const songsValid = songData.every((song) => {
                        return validateYouTubeUrl(song.url) && song.startSeconds >= 0 && song.endSeconds >=0
                    })

                    if (playerName != null && songsValid) {
                        SongfestStatus.emitFunctions.submitSongs({
                            playerName: playerName,
                            songData: songData
                        })
                    }
                    else {
                        console.log("invalid")
                    }
                    // onClose()
                }}>
                    {SongfestStatus.songsProcessed ? "Submit" : "Processing..."}
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