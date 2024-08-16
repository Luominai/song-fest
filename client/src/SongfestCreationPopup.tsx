/**
 * This renders a form containing information about the Songfest's theme, host, and songs per person
 * On submit, this updates the corresponding variables in Songfest.tsx as well as serverside in index.js 
 */

import { useContext, useState } from "react"
import { SongfestContext } from "./SongfestContext"

function SongfestCreationPopup( {onClose}: {onClose: any} ) {
    const SongfestStatus = useContext(SongfestContext)
    const [theme, setTheme] = useState("")
    const [songsPerPerson, setSongsPerPerson] = useState(1)
    const [host, setHost] = useState("")

    return (
        <>
            <form className='popup'>
                {/* The X button on the popup */}
                <button style={{float: 'right'}} onClick={onClose}>&times;</button>
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
                <button type="button" className='button' onClick={() => {
                    // start the songfest and update corresponding variables
                    SongfestStatus.emitFunctions.startSongfest({
                        "songsPerPerson": songsPerPerson,
                        "theme": theme,
                        "host": host
                    })
                }}>
                    Submit
                </button>
                </center>
            </form>
        </>
    )
}

export default SongfestCreationPopup