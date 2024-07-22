import { createContext } from "react";
import SongfestStatus from "./SongfestStatusInterface";

const SongfestStatusContext = createContext<SongfestStatus | null>(null)

export default SongfestStatusContext
