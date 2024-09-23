import { useEffect, useRef, useState } from "react"
import { Player, Song } from "../../../common"
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, Table, TableOptions, useReactTable } from "@tanstack/react-table"
import { socket } from "../Socket"

const songColumnHelper = createColumnHelper<Song>()
const songColumns = [
    songColumnHelper.accessor(row => {return {thumbnail: row.thumbnail, title: row.title}}, {
        header: "Song",
        cell: props => <div>
            <img src={props.getValue().thumbnail}/>
            <span>{props.getValue().title}</span>
        </div>,
        enableSorting: false
    }),
    songColumnHelper.accessor("likedScore", {
        header: "Liked Score",
        cell: props => <span>{props.getValue().total}</span>,
        sortDescFirst: true
    }),
    songColumnHelper.accessor("themeScore", {
        header: "Theme Score",
        cell: props => <span>{props.getValue().total}</span>,
        sortDescFirst: true
    }),
    songColumnHelper.accessor("submitterName", {
        header: "submitter",
        cell: props => <span>{props.getValue()}</span>,
        sortDescFirst: true
    })
]

const playerColumnHelper = createColumnHelper<Player>()
const playerColumns = [
    playerColumnHelper.accessor("name", {
        header: "Name",
        cell: props => <span>{props.getValue()}</span>
    }),
    playerColumnHelper.accessor("likedScore", {
        header: "Liked Score",
        cell: props => <span>{props.getValue().total}</span>
    }),
    playerColumnHelper.accessor("themeScore", {
        header: "Theme Score",
        cell: props => <span>{props.getValue().total}</span>
    }),
    playerColumnHelper.accessor("guessScore", {
        header: "Guess Score",
        cell: props => <span>{props.getValue()}</span>,
        sortDescFirst: true
    })
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
        <>
            <BasicTable tableData={playersTable}/>
            <BasicTable tableData={songsTable}/>
        </>
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) =>
                                <td>
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