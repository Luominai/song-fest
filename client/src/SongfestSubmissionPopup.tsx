import { Fragment, useContext, useState } from "react"
import SongfestStatusContext from "./SongfestStatusContext"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"

function SongfestSubmissionPopup() {
    const SongfestStatus = useContext(SongfestStatusContext)
    const [participant, setParticipant] = useState(null)
    const [query, setQuery] = useState("")
    const [savedSongs, setSavedSongs] = useState([])

    return (
        <>
            <form>
                <p>Name:</p>
                <Combobox value={participant} onChange={setParticipant} onClose={() => setQuery("")} immediate>
                    <ComboboxInput onChange={(event) => setQuery(event.target.value)} displayValue={(person: string) => person}/>
                    <ComboboxOptions anchor="bottom start">
                        {SongfestStatus.participants.map((person, index) => (
                            <ComboboxOption value={person} key={index}>
                                {person}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
                <br></br>

                {Array.from({length: (SongfestStatus?.songsPerPerson as number)}).map((_, index) => {
                    return (
                        <Fragment key={"song" + (index + 1)}>
                            <label htmlFor={"song" + (index + 1)}>Song {index + 1}:</label> <br></br>
                            <input type="url" defaultValue={savedSongs[index] ?? ""} id={"song" + (index + 1)}></input> <br></br>
                        </Fragment>
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