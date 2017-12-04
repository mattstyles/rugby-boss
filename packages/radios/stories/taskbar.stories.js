
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import {AppHeader, Footer} from '../storybook/app'
import {App, View, Text, GroupButton, H1, P, Icon, Taskbar} from '../src'
import {getTheme, getColor} from '../src/theme/helpers'

const FooterFill = Footer.extend`
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

  :hover span {
    text-shadow: none;
    color: ${getColor('primary')};
  }
`
const TaskbarText = Text.extend`
  font-size: ${getTheme('type.size.vsmall')}rem;
  font-weight: 500;
  transition: color ease-out ${getTheme('transition.main')}ms;
  margin: auto 0;
  display: block;
`

const tasks = [
  {
    icon: 'HOME',
    text: 'Home',
    action: action('home')
  },
  {
    icon: 'SETTINGS',
    text: 'Settings',
    action: action('settings')
  },
  {
    icon: 'CHECK',
    text: 'Check',
    action: action('check')
  },
  {
    icon: 'PLAY',
    text: 'Play',
    action: action('play')
  }
]

const iconTasks = [
  {
    icon: 'HOME',
    action: action('home')
  },
  {
    icon: 'SETTINGS',
    action: action('settings')
  },
  {
    icon: 'CHECK',
    action: action('check')
  },
  {
    icon: 'PLAY',
    action: action('play')
  }
]

const textTasks = [
  {
    text: 'Today',
    action: action('today')
  },
  {
    text: 'Calendar',
    action: action('calendar')
  },
  {
    text: 'Inbox',
    action: action('inbox')
  }
]

storiesOf('taskbar', module)
  .add('with children', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <H1>Taskbar children</H1>
        <P>A taskbar component can be passed buttons as children. This is useful if you have some funky buttons to use in the taskbar.</P>
      </View>
      <FooterFill>
        <Taskbar>
          <TaskbarButton onClick={action('home')}>
            <Icon
              icon='HOME'
              size={2.1}
            />
            <TaskbarText>Home</TaskbarText>
          </TaskbarButton>
          <TaskbarButton onClick={action('settings')}>
            <Icon
              icon='SETTINGS'
              size={2.1}
            />
            <TaskbarText>Settings</TaskbarText>
          </TaskbarButton>
        </Taskbar>
      </FooterFill>
    </App>
  ))
  .add('with tasks', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <H1>Taskbar example</H1>
        <P>Tasks can also be passed to as an array to a taskbar component where they will be styled appropriately.</P>
      </View>
      <FooterFill>
        <Taskbar tasks={tasks} />
      </FooterFill>
    </App>
  ))
  .add('icons only', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <H1>Taskbar example</H1>
        <P>Only pass icon type if you don’t need text.</P>
      </View>
      <FooterFill>
        <Taskbar tasks={iconTasks} />
      </FooterFill>
    </App>
  ))
  .add('text only', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <H1>Taskbar example</H1>
        <P>Task buttons can also be only text, just omit the icon type reference from the tasks array.</P>
      </View>
      <FooterFill>
        <Taskbar tasks={textTasks} />
      </FooterFill>
    </App>
  ))
