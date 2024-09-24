import { useEffect, useRef, useState } from "react"

export default function EllipsesOverflow({text, maxHeight, width}: {text: string, maxHeight: number, width: number}) {
    const [innerText, setInnerText] = useState(text)
    const element = useRef<HTMLSpanElement>()
    const toggle = useRef(false)
    const left = useRef(0)
    const middle = useRef(text.length)
    const right = useRef(text.length)

    useEffect(() => {
        if (!element.current?.getBoundingClientRect()) {
            return
        }
        if (element.current?.getBoundingClientRect().height > maxHeight) {
            toggle.current = true;
        }
    },[])

    useEffect(() => {
        if (!element.current?.getBoundingClientRect()) {
            return
        }
        if (!toggle) {
            return
        }
        // if the pointers cross or overlap, stop
        if (right >= left) {
            toggle.current = false
            setInnerText(text.slice(0, middle.current - 3) + "...")
        }
        // search for the right position to put the ellipses
        if (element.current?.getBoundingClientRect().height > maxHeight) {
            // move the right pointer to this position
            right.current = middle.current
            // change the middle to somewhere in the middle
            middle.current = Math.floor((left.current + right.current) / 2)
            // add ellipses at the middle and try it
            setInnerText(text.slice(0, middle.current) + "...")
        }
        if (element.current.getBoundingClientRect().height < maxHeight) {
            // move the left pointer to this position
            left.current = middle.current
            // change the middle to somewhere in the middle
            middle.current = Math.floor((left.current + right.current) / 2)
            // add ellipses at the middle and try it
            setInnerText(text.slice(0, middle.current) + "...")
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