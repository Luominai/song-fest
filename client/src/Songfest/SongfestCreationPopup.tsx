/**
 * This renders a form containing information about the Songfest's theme, host, and songs per person
 * On submit, this updates the corresponding variables in Songfest.tsx as well as serverside in index.js 
 */

import { useState } from "react"
import { socket } from "../Socket"

function SongfestCreationPopup( {closeModal}: {closeModal: any} ) {
    const [theme, setTheme] = useState("")
    const [songsPerPerson, setSongsPerPerson] = useState(1)
    const [host, setHost] = useState("")

    return (
        <>
            <form className='popup'>
                {/* The X button on the popup */}
                <button style={{float: 'right'}} onClick={closeModal}>&times;</button>
                <br></br> <br></br>
                
                <label htmlFor="theme">Theme: </label>
                <input type="text" id="theme" className="theme" required
                onChange={(event) => {
                    setTheme(event.target.value)
                }}
                /> <br></br> <br></br>

                <label htmlFor="host">Host: </label>
                <input type="text" id="host" className="host" required
                onChange={(event) => {
                    setHost(event.target.value)
                }}/><br></br> <br></br>

                <label htmlFor="songsPerPerson">Songs per person: </label>
                <input type="number" id="songsPerPerson" className="songsPerPerson" required
                onChange={(event) => {
                    setSongsPerPerson(parseInt(event.target.value))
                }}
                /> <br></br> <br></br>

                <center>
                <button type="button" className='startSongfest' onClick={() => {
                    socket.emit("startSongfest", {
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