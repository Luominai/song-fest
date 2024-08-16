import Game from "./Game";
import Player from "./Player";

export default class Songfest {
    constructor() {
        this._songfestOpen = false
        this._players = []
    }

    private _songfestOpen: boolean;
    public get songfestOpen(): boolean {
        return this._songfestOpen;
    }
    public set songfestOpen(value: boolean) {
        this._songfestOpen = value;
    }

    private _players: Array<Player>;
    public get players(): Array<Player> {
        return this._players;
    }
    public set players(value: Array<Player>) {
        this._players = value;
    }

    private _songsPerPerson: number;
    public get songsPerPerson(): number {
        return this._songsPerPerson;
    }
    public set songsPerPerson(value: number) {
        this._songsPerPerson = value;
    }

    private _theme: string;
    public get theme(): string {
        return this._theme;
    }
    public set theme(value: string) {
        this._theme = value;
    }

    private _host: string;
    public get host(): string {
        return this._host;
    }
    public set host(value: string) {
        this._host = value;
    }

    private _game: Game;
    public get game(): Game {
        return this._game;
    }
    public set game(value: Game) {
        this._game = value;
    }

}