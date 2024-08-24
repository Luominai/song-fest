import { createContext } from "react";
import { ClientState } from "../../common";

const StateContext = createContext<ClientState>(null as any)
const DispatchContext = createContext<any>(null)

export {StateContext, DispatchContext}