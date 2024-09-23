import GameSummary from '../../src/game/GameSummary'
import "../../src/css/App.css"
import "../../src/css/index.css"
import "../../src/css/game.css"
import { Song, Player } from '../../../common'

const mockSong = new Song("wario")
const mockPlayer = new Player("wario", 1)

mockSong.url = 

describe('<GameSummary />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameSummary mock={{
        songs: [],
        players: []
    }}/>)
  })
})