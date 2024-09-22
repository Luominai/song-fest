import GameGuessingReview from '../../src/Game/GameGuessingReview'
import "../../src/css/App.css"
import "../../src/css/index.css"
import "../../src/css/game.css"

describe('<GameGuessingReview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameGuessingReview mock={{
        "ashley": 200,
        "ryan": 2,
        "kevin": 17
    }}/>)
  })
})