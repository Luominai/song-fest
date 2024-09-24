import { useEffect, useRef, useState } from "react"

export default function EllipsesOverflow({text, maxHeight, width}: {text: string, maxHeight: number, width: number}) {
    const [innerText, setInnerText] = useState(text)
    const element = useRef<HTMLSpanElement>()

    useEffect(() => {
        if (!element.current?.getBoundingClientRect()) {
            return
        }
        if (element.current?.getBoundingClientRect().height > maxHeight) {
            setInnerText("overflow")
        }
    })

    return (
        <div 
        ref={element as React.LegacyRef<HTMLDivElement>}
        style={{
            width: `${width}px`, 
            textWrap: "wrap"
        }}
        >
            {innerText}
        </div>
    )

}