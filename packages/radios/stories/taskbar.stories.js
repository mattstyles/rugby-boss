
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import {AppHeader, Footer} from '../storybook/app'
import {App, View, Text, ButtonGroup, GroupButton, H1, Icon} from '../src'
import {getTheme, getColor} from '../src/theme/helpers'

const TaskBar = Footer.extend`
  height: auto;
  padding: 0;
`
const TaskbarButton = GroupButton.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  line-height: normal;

  i {
    margin: auto;
  }

  span {
    transition: color ease-out ${getTheme('transition.main')}ms;
    margin: auto;
    display: block;
  }

  :hover span {
    text-shadow: none;
    color: ${getColor('primary')};
  }
`
const TaskbarText = Text.extend`
  font-size: ${getTheme('type.size.vsmall')}rem;
  font-weight: 500;
  margin-bottom: 0;
`

storiesOf('taskbar', module)
  .add('footer', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <H1>Taskbar Example</H1>
      </View>
      <TaskBar>
        <ButtonGroup>
          <TaskbarButton onClick={action('home')}>
            <Icon
              icon='HOME'
              size='2.1'
            />
            <TaskbarText>Home</TaskbarText>
          </TaskbarButton>
          <TaskbarButton onClick={action('settings')}>
            <Icon
              icon='SETTINGS'
              size='2.1'
            />
            <TaskbarText>Settings</TaskbarText>
          </TaskbarButton>
        </ButtonGroup>
      </TaskBar>
    </App>
  ))
