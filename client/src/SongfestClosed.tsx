import { useContext } from "react"
import SongfestStatusContext from "./SongfestStatusContext"

function SongfestClosed() {
    const SongfestStatus = useContext(SongfestStatusContext)

    return (
        <>
            <div>
                <img src='https://picsum.photos/466/318' className='image'></img>
            </div>
            <button onClick={() => SongfestStatus?.setSongfestOpen(true)}>
                Let the Shitfest begin
            </button>
        </>
    )
}

export default SongfestClosed