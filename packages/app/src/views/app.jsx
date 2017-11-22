
import {ThemeProvider} from 'styled-components'

import Title, {H1} from 'components/title'

const theme = {
  colors: {
    main: 'rgb(255, 66, 0)'
  }
}

const App = state => (
  <ThemeProvider theme={theme}>
    <div>
      <Title>styled components</Title>
      <H1 text='More heading' />
    </div>
  </ThemeProvider>
)

export default App
