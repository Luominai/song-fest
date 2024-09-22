import GameRatingReview from '../../src/Game/GameRatingReview'
import { Score } from '../../../common'
import "../../src/css/App.css"
import "../../src/css/index.css"
import "../../src/css/game.css"

describe('<GameRatingReview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameRatingReview mock={{
        liked: new Score(10, 2, 5),
        theme: new Score(2, 2, 13)
    }}/>)
  })
})