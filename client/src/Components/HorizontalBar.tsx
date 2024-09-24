import { useEffect, useState } from "react"

export default function HorizontalBar({label, count, percent, height = 40, width = 100, fontSize = 11, color = "rgba(95,168,255)", percentBasedBrightness = false}: 
    {label?: string, count: number, percent: number, height?: number, width?: number, fontSize?: number, color?: string, percentBasedBrightness?: boolean}) {
    const [style, setStyle] = useState({
        width: "2%", 
        backgroundColor: `${color}`,
        filter: (percentBasedBrightness) ? `brightness(${75 + 25*percent}%)` : `brightness(100%)`,
        borderRadius: `0 ${height/2}px ${height/2}px 0`,
        transition: "width 0.5s",
    })

    useEffect(() => {
        setStyle({...style, width: `${2 + (98 * percent)}%`} )
    }, [])

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            {label && <div style={{
                fontSize: `${fontSize}px`,
                textAlign: "center",
                height: `${height}px`,
                overflowX: "hidden"
            }}>
                {label}
            </div>}
            
            <div style={{
                height: `${height}px`,
                width: `${width}px`,
                display: "flex",
                flexDirection: "row"
            }}>
                <div style={style}>
                
                </div>

                <div style={{
                    textAlign: "center",
                    marginTop: "auto",
                    marginBottom: "auto",
                    fontSize: `${fontSize}px`
                }}>
                    {count}
                </div>
            </div>
        </div>
    )
}