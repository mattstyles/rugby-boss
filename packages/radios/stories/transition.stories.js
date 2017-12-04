
import React, {Component, Fragment} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {CSSTransition, TransitionGroup, Transition, ReplaceTransition} from 'react-transition-group'
import {VelocityTransitionGroup} from 'velocity-react'
import styled from 'styled-components'
import {Motion, TransitionMotion, spring, presets} from 'react-motion'

import {AppHeader, Footer} from '../storybook/app'
import {App, View, Text, Button, H1, P, Icon, Taskbar, Appear} from '../src'
import {getTheme, getColor} from '../src/theme/helpers'

const SlideLeft = styled.div`
  ${'' /* position: absolute;
  left: 0;
  top: 0; */}
  flex: 1;
  transition: transform ease-out 1000ms;
  transform: ${props => {
    console.log(props)

    const {status} = props
    console.log('>', status)
    if (status === 'entering') {
      return 'translateX(100%)'
    }
    if (status === 'entered') {
      return 'translateX(0)'
    }
    if (status === 'exiting') {
      return 'translateX(-100%)'
    }
  }}
`

// let styles = css`
//   .enter,
//   .appear {
//     opacity: 0.01;
//   }
//   .enter.enter-active,
//   .appear.appear-active  {
//     opacity: 1;
//     transition: opacity 1000ms ease-in;
//   }
//   .exit {
//     opacity: 1;
//   }
//   .exit.exit-active {
//     opacity: 0.01;
//     transition: opacity 800ms ease-in;
//   }
// `;

const Animate = (props) => (
  <Transition
    in={props.in}
    unmountOnExit
    timeout={500}
    {...props}
  >
    {status => (
      <SlideLeft status={status}>
        {/* <Icon icon={props.type % 2 ? 'HOME' : 'SETTINGS'} size={6.4} /> */}
        {props.children}
      </SlideLeft>
    )}
  </Transition>
)

class DynamicTransition extends React.Component {
  state = { count: 0, hide: false }
  handleClick = () => {
    // this.setState({ hide: !this.state.hide })
    this.setState(state => ({
      ...state,
      count: ++state.count
    }))
  }

  // componentDidMount() {
  //   this.interval = setInterval(() => {
  //     this.setState({ count: this.state.count + 1 })
  //   }, 700);
  // }
  // componentWillUnmount() { clearInterval(this.interval); }

  render() {
    const { hide, count } = this.state
    return (
      <div style={{position: 'relative'}}>
        <button onClick={this.handleClick}>Toggle item</button>
        <TransitionGroup timeout={1000}>
          {
            <Animate key={`item${count}`} type={count}>
              <div>Changing! {JSON.stringify(count)}</div>
            </Animate>
          }
        </TransitionGroup>
      </div>
    )
  }
}

const TransitionReplace = ({
  timeout,
  children,
  flag
}) => (
  <TransitionGroup timeout={timeout}>
    <Animate key={`item${flag}`}>
      {children}
    </Animate>
  </TransitionGroup>
)

class Tranner extends Component {
  state = {
    flag: false
  }

  onClick = () => this.setState(state => ({
    ...state,
    flag: !state.flag
  }))

  render () {
    const {flag} = this.state
    return (
      <Fragment>
        <button onClick={this.onClick}>Click me</button>
        {/* <TransitionReplace timeout={1000} animation='fade' flag>
          <div key={`itemF${flag}`}>Changing! {JSON.stringify(flag)}</div>
        </TransitionReplace> */}
        <TransitionGroup timeout={500}>
          <Animate key={`item${flag}`}>
            <div>Changing! {JSON.stringify(flag)}</div>
          </Animate>
        </TransitionGroup>
      </Fragment>
    )
  }
}

class MotionWrapper extends Component {
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
        {/* {flag && <MotionTest />} */}
        <MotionTest>
          <Icon key={`i${flag}`} icon={flag ? 'HOME' : 'SETTINGS'} size={4} />
          {/* <div key={`i${flag}`} flag={flag}>{`Hello ${flag}`}</div> */}
        </MotionTest>
      </div>
    )
  }
}

const MotionMove = styled.div.attrs({
  style: ({x, background, opacity}) => ({
    transform: `translateX(${x}%)`,
    // background: `${background}`,
    opacity: `${opacity}`
  })
})`
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  width: 40px;
`

const Block = styled.div`
  background: ${props => props.background};
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  width: 40px;
`

//
// const MotionMove = styled.div`
//   transform: ${props => {
//     return `translateX(${props.x}%)`
//   }};
//   height: 40px;
//   width: 40px;
//   background: rebeccapurple;
//   position: absolute;
//   top: 0;
//   left: 0;
// `

const MotionTest = ({
  children
}) => (
  // <Motion
  //   defaultStyle={{
  //     x: 0
  //   }}
  //   style={{
  //     x: spring(10)
  //   }}
  // >
  //   {/* {v => <div>{v.x}</div>} */}
  //   {v => <MotionMove x={v.x}>{children}</MotionMove>}
  // </Motion>
  <Fragment>
    <div>{children}</div>
    <TransitionMotion
      willLeave={() => {
        console.log('leaving')
        return {
          x: spring(-200),
          opacity: spring(0)
        }
      }}
      willEnter={() => {
        console.log('entering')
        return {
          x: 200,
          opacity: 0
        }
      }}
      styles={React.Children.map(children, child => {
        console.log(child.key, child)
        return {
          key: child.key,
          style: {
            x: spring(0, {
              stiffness: 280,
              damping: 15
            }),
            opacity: spring(100, {
              stiffness: 170,
              damping: 25
            })
          },
          data: {
            flag: child.props.flag
          }
        }
      })}
    >
      {styles => {
        return (
          <div style={{
            position: 'relative',
            // overflow: 'hidden',
            width: '40px',
            height: '40px',
            marginLeft: 150
          }}>
            {styles.map(config => {
              console.log('mapping', config)
              return (
                // <div
                //   key={config.key}
                //   style={{
                //     ...config.style,
                //     border: `1px solid ${config.data.flag ? 'black' : 'red'}`
                //   }}
                // />
                <MotionMove
                  key={config.key}
                  x={config.style.x}
                  opacity={config.style.opacity * 0.01}
                  background={config.data.flag ? 'black' : 'red'}
                >
                  {/* <Block background={config.data.flag ? 'red' : 'rebeccapurple'} /> */}
                  {/* <Icon icon={config.data.flag ? 'HOME' : 'SETTINGS'} size={4} /> */}
                  {children}
                </MotionMove>
              )
            })}
          </div>
        )
      }}
    </TransitionMotion>
  </Fragment>
)

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

storiesOf('transition', module)
  .add('with children', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <Tranner />
      </View>
    </App>
  ))
  .add('dynamic transition', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <DynamicTransition />
      </View>
    </App>
  ))
  .add('motion test', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <MotionWrapper />
      </View>
    </App>
  ))
  .add('appear', () => (
    <App>
      <AppHeader />
      <View isPadded>
        <AppearWrapper />
      </View>
    </App>
  ))
