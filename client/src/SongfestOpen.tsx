import { useContext } from "react"
import SongfestStatusContext from "./SongfestStatusContext"

function SongfestOpen() {
    const SongfestStatus = useContext(SongfestStatusContext)

    return (
        <>
            <div>
                <img src='https://picsum.photos/466/318' className='image'></img>
            </div>
            <div>
                <p>Theme: Melodramatic</p>
                <button>
                    Submit Songs
                </button>
            </div>
            <div>
                <button onClick={() => SongfestStatus?.setSongfestOpen(false)}>
                    Cancel Shitfest
                </button>
            </div>
        </>
    )
}

export default SongfestOpen