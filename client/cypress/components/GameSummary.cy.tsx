import GameSummary from '../../src/game/GameSummary'
import "../../src/css/App.css"
import "../../src/css/index.css"
import "../../src/css/game.css"
import { Song, Player, Score } from '../../../common'

const mockSong = new Song("wario")
mockSong.init("https://www.youtube.com/watch?v=AYtZ7GFV9ys", 0, 15)
mockSong.likedScore = new Score(1, 2, 3)
mockSong.themeScore = new Score(2, 1, 3)

const mockPlayer = new Player("wario", 1)
mockPlayer.likedScore = new Score(1, 2, 3)
mockPlayer.themeScore = new Score(2, 1, 3)

describe('<GameSummary />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameSummary mock={{
        songs: [mockSong],
        players: [mockPlayer]
    }}/>)
  })
})