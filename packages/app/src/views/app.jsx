
import {ThemeProvider} from 'styled-components'
import {Button, View, theme} from 'radios'
import {random} from 'lodash/fp'

import Title, {H1} from 'components/title'
import {signal} from 'signals'
import actions from 'core/actions'
import {getMessage} from 'core/selectors'

const onClick = () => {
  signal.emit({
    type: actions.anAction,
    payload: `test ${random(0, 1000)}`
  })
}

const App = ({state}) => (
  <ThemeProvider theme={theme}>
    <View>
      <Title>{`${getMessage(state)}`}</Title>
      <H1 text='More heading' />
      <Button primary onClick={onClick}>Click me</Button>
    </View>
  </ThemeProvider>
)

export default App
