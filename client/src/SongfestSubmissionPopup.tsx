import { Fragment, useContext, useState } from "react"
import SongfestStatusContext from "./SongfestStatusContext"

function SongfestSubmissionPopup() {
    const SongfestStatus = useContext(SongfestStatusContext)
    const [participant, setParticipant] = useState(null)
    const [savedSongs, setSavedSongs] = useState([])

    return (
        <>
            <form>
                <label htmlFor="names">Name:</label> <br></br>
                <input type="text" id="names" list="nameslist" required onChange={(event) => {
                    console.log(event.target.value)
                }}/>
                <datalist id="nameslist">
                    {SongfestStatus?.participants.map((participant, index) => {
                        return <option key={index}>{participant}</option>
                    })}
                </datalist> 
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