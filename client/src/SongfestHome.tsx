import { useContext } from "react"
import SongfestStatusContext from "./SongfestStatusContext"
import SongfestCreationPopup from "./SongfestCreationPopup"
import SongfestSubmissionPopup from "./SongfestSubmissionPopup"
import SongfestOpen from "./SongfestOpen"
import SongfestClosed from "./SongfestClosed"

function SongfestHome() {
    const SongfestStatus = useContext(SongfestStatusContext)

    return (
        <>
            <SongfestCreationPopup/>
                {SongfestStatus.songfestOpen ? <SongfestOpen/> : <SongfestClosed/>}
            <SongfestSubmissionPopup/>
        </>
    )
}

export default SongfestHome