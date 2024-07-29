import { useContext } from "react"
import SongfestStatusContext from "./SongfestStatusContext"
import ShitfestLogo from "./assets/SongShitfestLogo.png"

function SongfestClosed() {
    const SongfestStatus = useContext(SongfestStatusContext)

    return (
        <>
            <div>
                <img src={ShitfestLogo} className='logo'></img>
            </div>
            <button onClick={() => SongfestStatus?.setSongfestOpen(true)}>
                Let the Shitfest begin
            </button>
        </>
    )
}

export default SongfestClosed