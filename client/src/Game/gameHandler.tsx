/**
 * This file contains functions for receiving Game-related messages from the server.
 */

import { Socket } from "socket.io-client"
import { ServerToClientEvents, ClientToServerEvents, ClientGame } from "../../../common";

export default function registerGameHandler(socket:  Socket<ServerToClientEvents, ClientToServerEvents>, setGameStatus: Function) {
    socket.on("updateGameStatus", (state: ClientGame) => {
        setGameStatus(state)
    })
}
