import { useEffect, useRef, useState } from "react"
import { Player, Song } from "../../../common"
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, Table, TableOptions, useReactTable } from "@tanstack/react-table"
import { socket } from "../Socket"
import HorizontalBar from "../Components/HorizontalBar"
import "../css/gameSummary.css"

const songColumnHelper = createColumnHelper<Song>()
const songColumns = [
    songColumnHelper.accessor(row => {return {thumbnail: row.thumbnail, title: row.title}}, {
        header: "Song",
        cell: props => <div style={{display: "flex", alignItems: "center", gap: "2px"}}>
            <img src={props.getValue().thumbnail} style={{height: "27px", width: "48px"}}/>
            <span>{props.getValue().title}</span>
        </div>,
        enableSorting: false
    }),
    songColumnHelper.accessor("submitterName", {
        header: "submitter",
        cell: props => <span>{props.getValue()}</span>,
        sortDescFirst: true
    }),
    songColumnHelper.accessor("likedScore", {
        header: "Liked Score",
        cell: props => <div style={{width: "60px"}}>
            <HorizontalBar count={props.getValue().high} percent={props.getValue().high/props.getValue().total} color="rgba(110,238,161,255)" height={8} width={40} fontSize={6}/>
            <HorizontalBar count={props.getValue().mid} percent={props.getValue().mid/props.getValue().total} color="rgba(255,201,97,255)" height={8} width={40} fontSize={6}/>
            <HorizontalBar count={props.getValue().low} percent={props.getValue().low/props.getValue().total} color="rgb(255,96,96,255)" height={8} width={40} fontSize={6}/>
        </div>,
        sortDescFirst: true
    }),
    songColumnHelper.accessor("themeScore", {
        header: "Theme Score",
        cell: props => <div style={{width: "60px"}}>
            <HorizontalBar count={props.getValue().high} percent={props.getValue().high/props.getValue().total} color="rgba(110,238,161,255)" height={8} width={40} fontSize={6}/>
            <HorizontalBar count={props.getValue().mid} percent={props.getValue().mid/props.getValue().total} color="rgba(255,201,97,255)" height={8} width={40} fontSize={6}/>
            <HorizontalBar count={props.getValue().low} percent={props.getValue().low/props.getValue().total} color="rgb(255,96,96,255)" height={8} width={40} fontSize={6}/>
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
    const gameSummaryData = useRef<{songs: Song[], players: Player[]} | null>(mock ?? null)

    const playersTable = useReactTable({
        data: gameSummaryData.current?.players ?? [],
        columns: playerColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    const songsTable = useReactTable({
        data: gameSummaryData.current?.songs ?? [],
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
        function setGameSummaryData(data: {songs: Song[],players: Player[]}) {
            gameSummaryData.current = data
        }
        socket.on("updateGameSummaryData", setGameSummaryData)
        return () => {
            socket.off("updateGameSummaryData", setGameSummaryData)
        }
    }, [socket])

    return (
        <div style={{display: "flex"}}>
            <BasicTable tableData={playersTable}/>
            <BasicTable tableData={songsTable}/>
        </div>
    )
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
                        <tr className="cell" key={row.id}>
                            {row.getVisibleCells().map((cell) =>
                                <td style={{textAlign: "center", height: "22px"}}>
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
