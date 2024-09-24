import { useEffect, useState } from "react"

export default function VerticalBar({count, percent, height = 40, width = 100, fontSize = 11, color = "rgba(95,168,255)"}: 
    {count?: number, percent: number, height: number, width: number, fontSize: number, color: string}) {
    const [style, setStyle] = useState({
        height: "2%", 
        backgroundColor: color,
        borderRadius: `${width/2}px ${width/2}px 0 0`,
        transition: "height -.5s"
    })

    useEffect(() => {
        setStyle({...style, height: `${2 + (98 * percent)}%`} )
    }, [])

    return (
        <>
            <div style={{
                height: `${height}px`,
                width: `${width}px`,
                display: "flex",
                flexDirection: "column-reverse"
            }}>
                <div style={style}>
                {/* <div className="number">{number}</div> */}
                
                </div>
                <div style={{color: color, fontSize: fontSize, textAlign: "center"}}>
                    {count ?? ""}
                </div>
            </div>
        
            {/* <div className="label">
                {label}
            </div> */}
        </>
    )
}