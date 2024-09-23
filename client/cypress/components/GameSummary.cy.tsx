import GameSummary from '../../src/game/GameSummary'
import "../../src/css/App.css"
import "../../src/css/index.css"
import "../../src/css/game.css"
import { Song, Player, Score } from '../../../common'

const mockSong = new Song("wario")
mockSong.thumbnail = "https://i.ytimg.com/vi/AYtZ7GFV9ys/mqdefault.jpg"
mockSong.startSeconds = 0;
mockSong.endSeconds = 15
mockSong.title = "it's nesting season"
mockSong.likedScore = new Score(1, 2, 3)
mockSong.themeScore = new Score(2, 1, 3)

const mockPlayer = new Player("wario", 1)
mockPlayer.likedScore = new Score(1, 2, 3)
mockPlayer.themeScore = new Score(2, 1, 3)

describe('<GameSummary />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameSummary mock={{
        songs: [mockSong, mockSong, mockSong],
        players: [mockPlayer, mockPlayer, mockPlayer]
    }}/>)
  })
})