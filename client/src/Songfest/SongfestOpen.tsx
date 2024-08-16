/**
 * This component is rendered when there is a songfest active but the game has not started.
 * It renders buttons for submitting songs, starting the game, and canceling the songfest
 */

import { useContext, useState } from "react"
import SongfestContext from "./SongfestContext"
import ShitfestLogo from "../assets/SongShitfestLogo.png"
import SongfestSubmissionPopup from "./SongfestSubmissionPopup"
import { createPortal } from "react-dom"

function SongfestOpen() {
    const SongfestStatus = useContext(SongfestContext)
    const [showModal, setShowModal] = useState(false);

    if (SongfestStatus == null) {
        return
    }

    return (
        <>
            <div>
                <img src={ShitfestLogo} className='logo'></img>
            </div>
            <div>
                <p>Theme: {SongfestStatus.state?.theme}</p>

            <br></br>
                <button onClick={() => {setShowModal(true)}}>
                    Submit Songs
                </button>
                {showModal && createPortal(
                    <SongfestSubmissionPopup onClose={() => setShowModal(false)}/>,
                    document.body
                )}
            </div>

            <br></br>
            <div>
                <button onClick={() => {
                    SongfestStatus.emitFunctions.startGame()
                }}>
                    Start Shitfest
                </button>
            </div>

            <br></br>
            <div>
                <button onClick={() => {
                    SongfestStatus.emitFunctions.cancelSongfest()
                }}>
                    Cancel Shitfest
                </button>
            </div>
        </>
    )
}

export default SongfestOpen