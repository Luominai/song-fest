import { useContext, useState } from "react"
import { createPortal } from "react-dom"
import SongfestStatusContext from "./SongfestStatusContext"

function SongfestCreationPopup( {onClose}: {onClose: any} ) {
    const SongfestStatus = useContext(SongfestStatusContext)
    const [theme, setTheme] = useState("")
    const [songsPerPerson, setSongsPerPerson] = useState(1)
    const [host, setHost] = useState("")

    return (
        <>
            <form className='popup'>
                {/* The X button on the popup */}
                <button onClick={onClose}>&times;</button>
                <br></br> <br></br>
                
                <label htmlFor="theme">Theme: </label>
                <input type="text" id="theme" required
                onChange={(event) => {
                    setTheme(event.target.value)
                }}
                /> <br></br> <br></br>

                <label htmlFor="host">Host: </label>
                <input type="text" id="host" required
                onChange={(event) => {
                    setHost(event.target.value)
                }}/><br></br> <br></br>

                <label htmlFor="songs per person">Songs per person: </label>
                <input type="number" id="songs per person" required
                onChange={(event) => {
                    setSongsPerPerson(parseInt(event.target.value))
                }}
                /> <br></br> <br></br>

                <center>
                <button type="button" className='button' onClick={(event) => {
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
                </center>
            </form>
        </>
    )
}

export default SongfestCreationPopup