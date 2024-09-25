import { useEffect, useState } from "react"
import { Player, Song } from "../../../common"
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, Table, TableOptions, useReactTable } from "@tanstack/react-table"
import { socket } from "../Socket"
import HorizontalBar from "../Components/HorizontalBar"
import VerticalBar from "../Components/VerticalBar"
import EllipsesOverflow from "../Components/EllipsesOverflow"
// import "../css/gameSummary.css"

const songColumnHelper = createColumnHelper<Song>()
const songColumns = [
    songColumnHelper.accessor(row => {return {thumbnail: row.thumbnail, title: row.title, submitter: row.submitterName}}, {
        header: "Song",
        cell: props => <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
            <img src={props.getValue().thumbnail} style={{height: "63px", width: "112px", margin: "auto", borderRadius: "10px"}}/>
            <div style={{display: "flex", flexDirection: "column", height: "100%", fontSize: "10px", justifyContent: "space-between", textAlign: "initial"}}>
                {/* <span style={{width: "128px", height: "3em", textWrap: "wrap"}}
                onLoad={(event) => {
                    event.currentTarget.innerHTML = "overflow"
                    if (event.currentTarget.getBoundingClientRect().height > 10) {
                        event.currentTarget.textContent = "overflow"
                    }
                }}
                >{props.getValue().title}</span> */}
                <EllipsesOverflow text={props.getValue().title} maxHeight={36} width={128}/>
                <div style={{fontSize: "8px"}}>submitted by: <br></br> {props.getValue().submitter}</div>
            </div>

        </div>,
        enableSorting: false
    }),
    songColumnHelper.accessor("likedScore", {
        header: "Liked",
        cell: props => <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex"}}>
                <VerticalBar count={props.getValue().high} percent={props.getValue().high/props.getValue().total} color="rgba(110,238,161,255)" height={50} width={20} fontSize={10}/>
                <VerticalBar count={props.getValue().mid} percent={props.getValue().mid/props.getValue().total} color="rgba(255,201,97,255)" height={50} width={20} fontSize={10}/>
                <VerticalBar count={props.getValue().low} percent={props.getValue().low/props.getValue().total} color="rgb(255,96,96,255)" height={50} width={20} fontSize={10}/>
            </div>
            <div style={{fontSize: "10px", textAlign: "center"}}>
                Liked: {props.getValue().low + props.getValue().mid * 2 + props.getValue().high * 3}
            </div>
        </div>,
        sortDescFirst: true
    }),
    songColumnHelper.accessor("themeScore", {
        header: "Theme",
        cell: props => <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex"}}>
                <VerticalBar count={props.getValue().high} percent={props.getValue().high/props.getValue().total} color="rgba(110,238,161,255)" height={50} width={20} fontSize={10}/>
                <VerticalBar count={props.getValue().mid} percent={props.getValue().mid/props.getValue().total} color="rgba(255,201,97,255)" height={50} width={20} fontSize={10}/>
                <VerticalBar count={props.getValue().low} percent={props.getValue().low/props.getValue().total} color="rgb(255,96,96,255)" height={50} width={20} fontSize={10}/>
            </div>
            <div style={{fontSize: "10px", textAlign: "center"}}>
                Liked: {props.getValue().low + props.getValue().mid * 2 + props.getValue().high * 3}
            </div>
        </div>,
        sortDescFirst: true
    })
]

const playerColumnHelper = createColumnHelper<Player>()
const playerColumns = [
    playerColumnHelper.accessor("name", {
        header: "Name",
        cell: props => <span>{props.getValue()}</span>
    }),
    playerColumnHelper.accessor(row => {return {liked: row.likedScore, theme: row.themeScore, guess: row.guessScore}}, {
        header: "Score",
        cell: props => <div>
            <span>{props.getValue().liked.total} / </span>
            <span>{props.getValue().theme.total} / </span>
            <span>{props.getValue().guess}</span>
        </div>,
        enableSorting: false
    }),
]

export default function GameSummary({mock}: {mock?: {songs: Song[], players: Player[]}}) {
    const [gameSummaryData, setGameSummaryData] = useState<{songs: Song[], players: Player[]} | null>(mock ?? null)

    const playersTable = useReactTable({
        data: gameSummaryData?.players ?? [],
        columns: playerColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    const songsTable = useReactTable({
        data: gameSummaryData?.songs ?? [],
        columns: songColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    // on render, fetch the song and player data from server
    useEffect(() => {
        if (!gameSummaryData) {
            socket.emit("getGameSummaryData")
        }
    }, [])
    useEffect(() => {
        socket.on("updateGameSummaryData", setGameSummaryData)
        return () => {
            socket.off("updateGameSummaryData", setGameSummaryData)
        }
    }, [socket])

    return (
        <div style={{display: "flex"}}>
            {/* <BasicTable tableData={playersTable}/> */}
            {/* <BasicTable tableData={songsTable}/> */}
            <CoolerTable tableData={songsTable}/>
        </div>
    )
}

function CoolerTable({tableData}: {tableData: Table<any>}) {
    return <>
        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
            {tableData.getRowModel().rows.map((row) => 
                <div style={{display: "flex", gap: "10px", borderRadius: "10px"}}>
                    {row.getVisibleCells().map((cell) => 
                        <>
                            {flexRender(
                                cell.column.columnDef.cell, 
                                cell.getContext()
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    </>
}

function BasicTable({tableData}: {tableData: Table<any>}) {
    return (
        <div>
            <table>
                {/* Table Headers */}
                <thead>
                    {tableData.getHeaderGroups().map((headerGroup) => 
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => 
                                <th key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header, 
                                        header.getContext()
                                    )}
                                </th>
                            )}
                        </tr>
                    )}
                </thead>
                {/* Table Cells */}
                <tbody>
                    {tableData.getRowModel().rows.map((row) => 
                        <tr key={row.id} style={{
                            border: "1px solid #676BC9",
                            borderCollapse: "collapse"
                        }}>
                            {row.getVisibleCells().map((cell) =>
                                <td style={{textAlign: "center", paddingLeft: "2px"}}>
                                    {flexRender(
                                        cell.column.columnDef.cell, 
                                        cell.getContext()
                                    )}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
