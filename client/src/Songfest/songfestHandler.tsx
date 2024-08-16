/**
 * This file contains functions for responding to Songfest-related messages from the server.
 */

import { Socket } from "socket.io-client"
import {ClientSongfest, ClientToServerEvents, ServerToClientEvents} from "../../../common";

export default function registerSongfestHandler(socket: Socket<ServerToClientEvents, ClientToServerEvents>, setSongfestStatus: Function) {
    socket.on("updateSongfestStatus", (state: ClientSongfest) => {
        console.log(state)
        setSongfestStatus(state)
    })
}
