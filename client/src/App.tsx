/**
 * This is the top level component for the entire project.
 * Contains a socket connection that is passed to Game.tsx and Songfest.tsx
 */

import { useEffect, useReducer } from 'react'
import './css/App.css'
import GameApp from './Game/GameApp'
import SongfestApp from './Songfest/SongfestApp'
import { socket } from './Socket'
import { StateContext, DispatchContext } from './Context'
import { tasksReducer, initialState } from './Reducer'
import { ClientState } from '../../common'

function App() {
    const [state, dispatch] = useReducer(tasksReducer, initialState)

    useEffect(() => {
        socket.emit("getState")
    }, [])
    useEffect(() => {
        function onUpdateState(newState: Partial<ClientState>) {
            dispatch({type: "update", payload: newState})
        }
        socket.on("updateState", onUpdateState)
        return () => {
            socket.off("updateState", onUpdateState)
        }
    }, [socket])

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {state.gameInProgress ? 
                <GameApp/> :
                <SongfestApp/>
                }
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export default App
