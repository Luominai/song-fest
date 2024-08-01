import { useContext, useState } from "react"
import SongfestStatusContext from "./SongfestStatusContext"
import ShitfestLogo from "./assets/SongShitfestLogo.png"
import SongfestSubmissionPopup from "./SongfestSubmissionPopup"
import { createPortal } from "react-dom"

function SongfestOpen() {
    const SongfestStatus = useContext(SongfestStatusContext)
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <img src={ShitfestLogo} className='logo'></img>
            </div>
            <div>
                <p>Theme: {SongfestStatus.theme}</p>

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
                    SongfestStatus.setGameStart(true)
                    SongfestStatus.startGame()
                }}>
                    Start Shitfest
                </button>
            </div>

            <br></br>
            <div>
                <button onClick={() => {
                    SongfestStatus.setSongfestOpen(false)
                }}>
                    Cancel Shitfest
                </button>
            </div>
        </>
    )
}

export default SongfestOpen