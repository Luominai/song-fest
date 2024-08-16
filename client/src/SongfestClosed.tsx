/**
 * This component is rendered when there is no songfest active.
 * It just renders the logo and and a button for the user to start a Songfest.
 * Renders SongfestCreationPopup.tsx when the button is pressed
 */

import { useState } from "react"
import { createPortal } from 'react-dom';
import ShitfestLogo from "./assets/SongShitfestLogo.png"
import SongfestCreationPopup from "./SongfestCreationPopup"

function SongfestClosed() {
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