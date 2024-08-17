import { useContext, useEffect, useState } from "react"
import GameContext from "./GameContext"
import YouTube from "react-youtube"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"

export default function GameGuessing() {
    const [guess, setGuess] = useState<string | null>(null)
    const [time, setTime] = useState(60000)
    const [timer, setTimer] = useState<number | null>(null)
    const [phaseOver, setPhaseOver] = useState(false)
    const [query, setQuery] = useState("")
    const [isMySong, setIsMySong] = useState(false)

    const gameState = useContext(GameContext)

    if (!gameState?.state?.currentSong) {
        return
    }

    // on render, start timer
    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(time - 100)
            if (time <= 0) {
                setPhaseOver(true)
                clearInterval(timerId)
            }
        }, 100)
        setTimer(timerId)

        setIsMySong(gameState.myPlayer?.name == gameState.state?.currentSongSubmitter.name)
    }, [])

    if (phaseOver) {
        return (
            <div>
                You have submitted your guess
            </div>
        )
    }

    return (
        <>
            <div>
                Guess who submitted the song
            </div>

            <YouTube
            className={"youtube"}
            videoId={gameState?.state?.currentSong.videoId}
            opts={{
                playerVars: {
                    start: gameState?.state?.currentSong.startSeconds,
                    end: gameState?.state?.currentSong.endSeconds,
                    autoplay: 1,
                }
            }}
            />

            <Combobox value={guess} onChange={setGuess} immediate>
                <ComboboxInput onChange={(event) => setQuery(event.target.value)}/>
                <ComboboxOptions anchor="bottom start" className=" group border-[3px] border-[#676BC9] bg-[#676BC9] rounded-lg w-[var(--input-width)] text-center [--anchor-gap:3px] scrollbar empty:invisible [--anchor-max-height:80px] hover:text-white">
                    {// filter the list of players using the query
                    gameState?.state?.players.filter((person) => {
                        return person.name.toLowerCase().includes(query.toLowerCase())
                    })
                    // for every player remaining, create an option for them in the combobox
                    .map((person, index) => (
                        <ComboboxOption value={person.name} key={index} className="bg-[#A6B5EA] hover:bg-[#6f71b2]">
                            {person.name}
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>

            <div>
                <button
                type="button"
                disabled={isMySong}
                onClick={() => {
                    if (guess != null) {
                        gameState?.emitFunctions.guessSongSubmitter({
                            playerName: guess,
                            time: time
                        })
                        setPhaseOver(true)
                    }
                }}
                >
                    {isMySong ? "This is your song" : "Confirm"}
                </button>
            </div>
        </>
    )
}