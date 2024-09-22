import GameGuessingReview from '../../src/Game/GameGuessingReview'
import "../../src/css/App.css"
import "../../src/css/index.css"
import "../../src/css/game.css"

describe('<GameGuessingReview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameGuessingReview mock={{
        "ashley": 3,
        "ryan": 2,
        "kevin": 5,
        "michael": 4,
        "steph": 1,
        "jessie": 3
    }}/>)
  })
})