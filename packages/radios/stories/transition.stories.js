
import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import {AppHeader, Footer} from '../storybook/app'
import {App, View, Icon, Taskbar, Appear} from '../src'

const FooterFill = Footer.extend`
  height: 41px;
  padding: 0;
`

const getTasks = flag => {
  return flag
    ? [
      {
        icon: 'CHECK',
        action: action('check')
      },
      {
        icon: 'PLAY',
        action: action('play')
      }
    ]
    : [
      {
        icon: 'HOME',
        action: action('home')
      },
      {
        icon: 'SETTINGS',
        action: action('settings')
      }
    ]
}

class AppearWrapper extends Component {
  state = {
    flag: false
  }

  onClick = () => this.setState(s => ({
    ...s,
    flag: !s.flag
  }))

  render () {
    const {flag} = this.state
    return (
      <div>
        <button onClick={this.onClick}>Click me</button>
        <Appear
          appearDistance={200}
          containerStyles={{
            position: 'relative',
            width: '40px',
            height: '40px'
          }}
        >
          <Icon key={`i${flag}`} icon={flag ? 'HOME' : 'SETTINGS'} size={4} />
        </Appear>
      </div>
    )
  }
}

class AppearTimer extends Component {
  state = {
    flag: false
  }

  timeout = null

  timeoutTime = 5000

  componentDidMount = () => {
    this.onTick()
  }

  componentWillUnmount = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  onTick = () => {
    this.setState(state => ({
      ...state,
      flag: !state.flag
    }))
    this.timeout = setTimeout(this.onTick, this.timeoutTime)
  }

  render () {
    const {flag} = this.state
    return (
      <Appear
        appearDistance={100}
        containerStyles={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
        itemStyles={{
          width: '100%'
        }}
        translatePreset={{
          stiffness: 210,
          damping: 20
        }}
        opacityPreset={{
          stiffness: 200,
          damping: 28
        }}
      >
        <Taskbar key={`i${flag}`} tasks={getTasks(flag)} />
      </Appear>
    )
  }
}

storiesOf('transition', module)
  .add('appear', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <AppearWrapper />
      </View>
      <FooterFill>
        <AppearTimer />
      </FooterFill>
    </App>
  ))
