import 'chartjs-plugin-datalabels'
import { Switch, Route } from 'react-router-dom'
import TotalScoreBoard from './components/TotalScoreBoard'
import Player from './components/Player'
import NavBar from './components/NavBar'
import styled from 'styled-components'
import GlobalStyle from './styles/globalStyle'
import { device } from './styles/device'

const Main = styled.main`
  padding: 5rem 0 0 0;

  @media ${device.mobileL} {
    padding: 3rem 0 0 0;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Main>
        <Switch>
          <Route path="/" exact component={TotalScoreBoard} />
          <Route path="/p/:slug" exact component={Player} />
        </Switch>
      </Main>
    </>
  )
}

export default App;
