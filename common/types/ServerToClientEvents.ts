export default interface ServerToClientEvents {
    updateState: (state) => void
    startGame: () => void

    startProcessingSongs: () => void
    endProcessingSongs: () => void

    isThisYourSong: (yesOrNo: boolean) => void
    updateDistributions: (distribution: any) => void
}