import GamePlayerSelect from '../../src/Game/GamePlayerSelect'

describe('<GamePlayerSelect />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GamePlayerSelect />)
  })
})