import GameRatingReview from '../../src/Game/GameRatingReview'
import { Score } from '../../../common'
import "../../src/css/App.css"
import "../../src/css/index.css"

describe('<GameRatingReview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameRatingReview mock={{
        liked: new Score(1, 2, 5),
        theme: new Score(2, 2, 4)
    }}/>)
  })
})