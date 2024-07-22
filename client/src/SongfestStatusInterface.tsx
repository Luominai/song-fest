export default interface SongfestStatus {
    songfestOpen: Boolean,
    setSongfestOpen: Function,

    participants: Array<string>,
    setParticipants: Function,

    songs: Record<string, string>,
    setSongs: Function,

    songsPerPerson: number,
    setSongsPerPerson: Function,
}