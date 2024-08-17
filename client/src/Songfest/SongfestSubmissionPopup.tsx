/**
 * This renders a form containing information about the player's name, and the songs they want to submit.
 * On submit, this updates the corresponding variables in Songfest.tsx as well as serverside in index.js 
 */

import { useContext, useState } from "react"
import SongfestContext from "./SongfestContext"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"

function SongfestSubmissionPopup({onClose}: {onClose: any}) {
    const SongfestStatus = useContext(SongfestContext)
    const [playerName, setPlayerName] = useState<string | null>(null)
    const [query, setQuery] = useState<string>("")
    const [songs, setSongs] = useState<Array<string>>(Array.from({length: SongfestStatus?.state?.songsPerPerson ?? 0}).map((value) => ""))

    if (SongfestStatus == null) {
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
                    // if the participant is null, stop here
                    if (value == null) {
                        return
                    }
                    // try to get the array of songs the participant has saved
                    const participantSongs = SongfestStatus.state?.players.find((entry) => entry.name == value)?.songs
                    if (!participantSongs) {
                        return
                    }
                    // map the array of songs to an array of song urls
                    const songUrls = participantSongs.map((entry) => entry.url)
                    // set the songs to the particpant's songs that they've entered previously (if they exist)
                    if (participantSongs != null) {
                        setSongs(songUrls)
                    }
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
                        <div key={"song" + (index + 1)}>
                            <label htmlFor={"song" + (index + 1)}>Song {index + 1}:</label> <br></br>
                            {/* the value of the input matches the songs state */}
                            <input type="text" value={songs[index] ?? ""} id={"song" + (index + 1)}
                            // when a change is made to the input, the songs state is updated accordingly
                            onChange={(event) => {
                                let copy = [...songs]
                                copy[index] = event.target.value
                                console.log(copy)
                                setSongs(copy)
                            }}
                            ></input>
                        </div>
                    )
                })}
                <br></br>

                <center>
                <button type="button" disabled={!SongfestStatus.songsProcessed} onClick={() => {
                    const songData = songs.map((songUrl) => {
                        return {
                            "url": songUrl
                        }
                    })

                    if (playerName != null) {
                        SongfestStatus.emitFunctions.submitSongs({
                            playerName: playerName,
                            songData: songData
                        })
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

export default SongfestSubmissionPopup