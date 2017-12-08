
import React, {Component, Fragment} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import styled from 'styled-components'

import {AppHeader, Footer} from '../storybook/app'
import {App, View, Icon, Taskbar, P, Code, Button,
  Appear,
  AnimateGroup,
  Fade,
  ScrollUp,
  SlideUp
} from '../src'

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
        <Button primary onClick={this.onClick}>Click me</Button>
        <Appear
          appearDistance={200}
          containerStyles={{
            position: 'relative',
            width: '40px',
            height: '40px'
          }}
        >
          {flag
            ? <Icon key='home' icon={'HOME'} size={4} />
            : <Icon key='settings' icon={'SETTINGS'} size={4} />
          }
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
        appearDistance={200}
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

const ReplaceMain = styled.div`
  height: 40px;
  padding: 12px;
`

class Replace extends Component {
  state = {
    flag: false
  }

  onClick = () => this.setState(s => ({
    ...s,
    flag: !s.flag
  }))

  render () {
    const {flag} = this.state
    const {onRender, text} = this.props
    return (
      <Fragment>
        <Button primary onClick={this.onClick}>{text}</Button>
        <ReplaceMain>
          <AnimateGroup>
            {onRender(flag)}
          </AnimateGroup>
        </ReplaceMain>
      </Fragment>
    )
  }
}

class FadeTimer extends Component {
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
      <AnimateGroup>
        <SlideUp in key={`i${flag}`}>
          <Taskbar tasks={getTasks(flag)} />
        </SlideUp>
      </AnimateGroup>
    )
  }
}

storiesOf('transition', module)
  .add('appear', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <P>Animations here use <Code>react-motion</Code> to provide spring based transitions.</P>
        <AppearWrapper />
      </View>
      <FooterFill>
        <AppearTimer />
      </FooterFill>
    </App>
  ))
  .add('transitions', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <P>These animations use <Code>react-transtion</Code> and <Code>transition-group</Code> to provide <em>CSS-like</em> transitions.</P>
        <Replace
          text='Fade'
          onRender={flag => flag
            ? <Fade in key='home' styles={{width: '4rem', height: '4rem'}}><Icon icon={'HOME'} size={4} /></Fade>
            : <Fade in key='settings'><Icon icon={'SETTINGS'} size={4} /></Fade>
          }
        />
        <Replace
          text='Scroll up'
          onRender={flag => flag
            ? <ScrollUp in key='home'><Icon icon={'HOME'} size={4} /></ScrollUp>
            : <ScrollUp in key='settings'><Icon icon={'SETTINGS'} size={4} /></ScrollUp>
          }
        />
        <Replace
          text='Slide Up'
          onRender={flag => flag
            ? <SlideUp in key='home'><Icon icon={'HOME'} size={4} /></SlideUp>
            : <SlideUp in key='settings'><Icon icon={'SETTINGS'} size={4} /></SlideUp>
          }
        />
      </View>
      <FooterFill>
        <FadeTimer />
      </FooterFill>
    </App>
  ))
