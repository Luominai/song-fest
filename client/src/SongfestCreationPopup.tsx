import { useContext, useState } from "react"
import SongfestStatusContext from "./SongfestStatusContext"

function SongfestCreationPopup() {
    const SongfestStatus = useContext(SongfestStatusContext)
    const [theme, setTheme] = useState("")
    const [songsPerPerson, setSongsPerPerson] = useState(1)
    const [host, setHost] = useState("")

    return (
        <>
            <form>
                <label htmlFor="theme">Theme:</label> <br></br>
                <input type="text" id="theme" required
                onChange={(event) => {
                    setTheme(event.target.value)
                }}
                /> <br></br>

                <label htmlFor="host">Host:</label> <br></br>
                <input type="text" id="host" required
                onChange={(event) => {
                    setHost(event.target.value)
                }}/><br></br> 

                <label htmlFor="songs per person">Songs per person:</label> <br></br>
                <input type="number" id="songs per person" required
                onChange={(event) => {
                    setSongsPerPerson(parseInt(event.target.value))
                }}
                /> <br></br>

                <button type="button" onClick={(event) => {
                    event.preventDefault()
                    // open the songfest and update corresponding variables
                    SongfestStatus.setSongfestOpen(true)
                    SongfestStatus.setSongsPerPerson(songsPerPerson)
                    SongfestStatus.setTheme(theme)
                    SongfestStatus.setHost(host)

                    // add host to list of participants
                    const copy = [...SongfestStatus.participants]
                    copy.push(host)
                    SongfestStatus.setParticipants(copy)
                    return false
                }}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default SongfestCreationPopup