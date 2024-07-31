import { useContext, useState } from "react"
import { createPortal } from 'react-dom';
import SongfestStatusContext from "./SongfestStatusContext"
import ShitfestLogo from "./assets/SongShitfestLogo.png"
import SongfestCreationPopup from "./SongfestCreationPopup"

function SongfestClosed() {
    const SongfestStatus = useContext(SongfestStatusContext)
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <img src={ShitfestLogo} className='logo'></img>
            </div>
            <button onClick={() => {
                setShowModal(true)
            }}>
                Let the Shitfest begin
            </button>
            {showModal && createPortal(
                <SongfestCreationPopup onClose={() => setShowModal(false)} />,
                document.body
            )}
        </>
    )
}

export default SongfestClosed