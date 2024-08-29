import { useContext, useEffect, useState } from "react"
import { Player, Song } from "../../../common"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, TableOptions, useReactTable } from "@tanstack/react-table"

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

export default function GameSummary() {
    const gameStatus = useContext(GameContext)
    const [data, setData] = useState<any[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [mode, setMode] = useState("songs")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    useEffect(() => {
        if (!gameStatus?.state) {
            return
        }
        if (mode == "songs") {
            setData(gameStatus?.state?.songs)
            setColumns(songColumns)
        }
        else if (mode == "players") {
            setData(gameStatus?.state?.players)
            setColumns(playerColumns)
        }
    }, [mode])

    return (
        <>
            <button
            type="button"
            onClick={() => setMode("players")}
            >
                players
            </button>
            <button
            type="button"
            onClick={() => setMode("songs")}
            >
                songs
            </button>
            <div>
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => 
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
                    <tbody>
                        {table.getRowModel().rows.map((row) => 
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
        </>
    )
}