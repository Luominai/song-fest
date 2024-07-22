import { Fragment, useContext, useState } from "react"
import SongfestStatusContext from "./SongfestStatusContext"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"

function SongfestSubmissionPopup() {
    const SongfestStatus = useContext(SongfestStatusContext)
    const [participant, setParticipant] = useState<string | null>(null)
    const [query, setQuery] = useState<string>("")

    // if the participant is not null, try to get the array of songs they have saved. Empty if no saved songs, or no participant
    const participantSongs = ((participant != null) ? (SongfestStatus.songs[participant] ?? []) : [])

    return (
        <>
            <form>
                {/* info about the combobox here: https://headlessui.com/react/combobox */}
                {/* the combobox is connected to the participant state variable and updates it when an option is selected */}
                {/* the combobox also sets the query to "" when closing the box (clears the text)*/}
                <p>Name:</p>
                <Combobox value={participant} onChange={setParticipant} onClose={() => setQuery("")} immediate>
                    {/* the query state variable updates to match what the user types */}
                    <ComboboxInput onChange={(event) => setQuery(event.target.value)} displayValue={(person: string) => person}/>
                    <ComboboxOptions anchor="bottom start">
                        {/* dynamically create an option based off what the user is typing. */}
                        {/* this option will show if the query is not whitespace and if the query does not match an existing participant*/}
                        {query.trim().length > 0 && !SongfestStatus.participants.includes(query) && (
                        <ComboboxOption value={query}>
                            Create <span className="font-bold">"{query}"</span>
                        </ComboboxOption>
                        )}

                        {// filter the list of participants using the query
                        SongfestStatus.participants.filter((person) => {
                            return person.toLowerCase().includes(query.toLowerCase())
                        })
                        // for every participant remaining, create an option for them in the combobox
                        .map((person, index) => (
                            <ComboboxOption value={person} key={index}>
                                {person}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
                <br></br>

                {/* create inputs for song urls. the number of inputs is determined by SongfestStatus.songsPerPerson */}
                {Array.from({length: SongfestStatus.songsPerPerson}).map((_, index) => {
                    return (
                        <div key={"song" + (index + 1)}>
                            <label htmlFor={"song" + (index + 1)}>Song {index + 1}:</label> <br></br>
                            <input type="url" defaultValue={participantSongs[index] ?? ""} id={"song" + (index + 1)}></input>
                        </div>
                    )
                })}

                {/* the submit button currently just does preventDefault to stop the default action of submitting the form (which reloads the page) */}
                <button onSubmit={(event) => {
                    event.preventDefault()
                    return false
                }}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default SongfestSubmissionPopup