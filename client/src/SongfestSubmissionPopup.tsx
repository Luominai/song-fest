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
                <p>Name:</p>
                <Combobox value={participant} onChange={setParticipant} onClose={() => setQuery("")} immediate>
                    <ComboboxInput onChange={(event) => setQuery(event.target.value)} displayValue={(person: string) => person}/>
                    <ComboboxOptions anchor="bottom start">
                        {query.trim().length > 0 && !SongfestStatus.participants.includes(query) && (
                        <ComboboxOption value={query}>
                            Create <span className="font-bold">"{query}"</span>
                        </ComboboxOption>
                        )}
                        {SongfestStatus.participants.filter((person) => {
                            return person.toLowerCase().includes(query.toLowerCase())
                        }).map((person, index) => (
                            <ComboboxOption value={person} key={index}>
                                {person}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
                <br></br>

                {Array.from({length: SongfestStatus.songsPerPerson}).map((_, index) => {
                    return (
                        <div key={"song" + (index + 1)}>
                            <label htmlFor={"song" + (index + 1)}>Song {index + 1}:</label> <br></br>
                            <input type="url" defaultValue={participantSongs[index] ?? ""} id={"song" + (index + 1)}></input>
                        </div>
                    )
                })}

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