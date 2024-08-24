import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react"
import { useContext, useState } from "react"
import { StateContext } from "../Context"

interface PlayerNameCombobox {
    onChange?: (value: string) => void
    enableDynamicOption?: boolean
}

export default function PlayerNameCombobox({onChange, enableDynamicOption}: PlayerNameCombobox) {
    const state = useContext(StateContext)
    const [query, setQuery] = useState("")

    return (
        <>
        {/* info about the combobox here: https://headlessui.com/react/combobox */}
        {/* the combobox is connected to the participant state variable and updates it when an option is selected */}
        {/* the combobox also sets the query to "" when closing the box (clears the text)*/}
        <p>Name:</p>
        <Combobox onChange={onChange} onClose={() => setQuery("")} immediate>
            {/* the query state variable updates to match what the user types */}
            <ComboboxInput onChange={(event) => setQuery(event.target.value)} displayValue={(name: string) => name}/>
            <ComboboxOptions anchor="bottom start" className=" group border-[3px] border-[#676BC9] bg-[#676BC9] rounded-lg w-[var(--input-width)] text-center [--anchor-gap:3px] scrollbar empty:invisible [--anchor-max-height:80px] hover:text-white">
                {/* dynamically create an option based off what the user is typing. */}
                {/* this option will show if the query is not whitespace and if the query does not match an existing participant*/}
                {enableDynamicOption && query.trim().length > 0 && !state.playerNames.includes(query) && (
                <ComboboxOption value={query} className="bg-[#A6B5EA] hover:bg-[#6f71b2]">
                    Create <span className="font-bold">"{query}"</span>
                </ComboboxOption>
                )}

                {// filter the list of participants using the query
                state.playerNames.filter((name) => {
                    return name.toLowerCase().includes(query.toLowerCase())
                })
                // for every participant remaining, create an option for them in the combobox
                .map((name, index) => (
                    <ComboboxOption value={name} key={index} className="bg-[#A6B5EA] hover:bg-[#6f71b2]">
                        {name}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
        </>
    )
}