/**
 * This file contains functions for responding to Songfest-related messages from the server.
 */

import { Socket } from "socket.io-client"
import ServerToClientEvents from "./types/ServerToClientEvents";
import ClientToServerEvents from "./types/ClientToServerEvents";
import ClientSongfest from "./types/ClientSongfest";

export default function registerSongfestHandler(socket: Socket<ServerToClientEvents, ClientToServerEvents>, setSongfestStatus: Function) {
    socket.on("updateSongfestStatus", (state: ClientSongfest) => {
        setSongfestStatus(state)
    })
}
