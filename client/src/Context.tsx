import { createContext } from "react";

const StateContext = createContext<any>(null)
const DispatchContext = createContext<any>(null)

export {StateContext, DispatchContext}