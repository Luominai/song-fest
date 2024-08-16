import Song from "../classes/Song";

export default interface ClientSong extends
Omit<Song, "submitter"> {

}