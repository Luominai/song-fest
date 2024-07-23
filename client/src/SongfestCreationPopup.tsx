import { useContext, useState } from "react"
import SongfestStatusContext from "./SongfestStatusContext"

function SongfestCreationPopup() {
    const SongfestStatus = useContext(SongfestStatusContext)
    const [theme, setTheme] = useState("")
    const [songsPerPerson, setSongsPerPerson] = useState(1)

    return (
        <>
            <form>
                <label htmlFor="theme">Theme:</label> <br></br>
                <input type="text" id="theme" required
                onChange={(event) => {
                    setTheme(event.target.value)
                }}
                /> <br></br>

                <label htmlFor="songs per person">Songs per person:</label> <br></br>
                <input type="number" id="songs per person" required
                onChange={(event) => {
                    setSongsPerPerson(parseInt(event.target.value))
                }}
                /> <br></br>

                <button type="button" onClick={(event) => {
                    event.preventDefault()
                    SongfestStatus.setSongfestOpen(true)
                    SongfestStatus.setSongsPerPerson(songsPerPerson)
                    SongfestStatus.setTheme(theme)
                    return false
                }}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default SongfestCreationPopup