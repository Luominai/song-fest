import { useContext } from "react"
import SongfestStatusContext from "./SongfestStatusContext"
import ShitfestLogo from "./assets/SongShitfestLogo.png"

function SongfestOpen() {
    const SongfestStatus = useContext(SongfestStatusContext)

    return (
        <>
            <div>
                <img src={ShitfestLogo} className='logo'></img>
            </div>
            <div>
                <p>Theme: {SongfestStatus.theme}</p>
                <button>
                    Submit Songs
                </button>
            </div>
            <div>
                <button onClick={() => {
                    SongfestStatus.setGameStart(true)
                    SongfestStatus.startGame()
                }}>
                    Start Shitfest
                </button>
            </div>
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