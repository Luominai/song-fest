import { useContext } from "react"
import SongfestStatusContext from "./SongfestStatusContext"

function SongfestSubmissionPopup() {
    const SongfestStatus = useContext(SongfestStatusContext)

    return (
        <>
            <form>
                <label htmlFor="name">Name:</label> <br></br>
                <input type="text" list="names" required/>
                <datalist id="names">
                    {SongfestStatus?.participants.map((participant) => <option>{participant}</option>)}
                </datalist> 
                <br></br>

                {Array.from({length: (SongfestStatus?.songsPerPerson as number)}).map((_, index) => {
                    return (
                        <>
                            <label htmlFor="name">Song {index + 1}:</label> <br></br>
                            <input type="url" required></input> <br></br>
                        </>
                    )
                })}

                <button>Submit</button>
            </form>
        </>
    )
}

export default SongfestSubmissionPopup