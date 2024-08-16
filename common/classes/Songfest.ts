import Game from "./Game";
import Player from "./Player";

export default class Songfest {
    constructor() {
        this.songfestOpen = false
        this.players = []
    }
    songfestOpen: boolean
    players: Array<Player>
    songsPerPerson: number
    theme: string
    host: Player
    game: Game;

}