
import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import createHistory from 'history/createMemoryHistory'
import oc from 'open-color'
import {Signal} from 'raid'

import {Navigator, createActions} from '../src/navigator/index.js'

import {PageTransition, PageGroup, childFactory, TRANSITIONS} from '../src/transitions/page'
import {H1, Button, View} from '../src'
import {AppHeader} from '../storybook/app'

const signal = Signal.of()
const history = createHistory()
const actions = createActions(history)

signal.register((state, event) => {
  if (event.type === '@navigator:push') {
    return {
      ...state,
      transition: TRANSITIONS.PAGE_IN
    }
  }
  if (event.type === '@navigator:pop') {
    return {
      ...state,
      transition: TRANSITIONS.PAGE_OUT
    }
  }
  return state
})

class NavigationTransition extends Component {
  constructor () {
    super()

    this.state = {
      navigation: []
    }

    this.mapChildren = child => {
      return (
        <PageTransition
          key={child.key}
          route={child.props.route}
        >
          {child}
        </PageTransition>
      )
    }
  }

  componentDidMount () {
    this.dispose = signal.observe(state => {
      this.setState(s => state)
    })
  }

  componentWillUnmount () {
    if (this.dispose) this.dispose()
  }

  render () {
    console.log('::', this.state)
    const {transition} = this.state
    return (
      <Navigator
        signal={signal}
        navigation={this.state.navigation}
        history={history}
        storage={null}
        Component={PageGroup}
        ComponentProps={{
          childFactory: childFactory(transition)
        }}
      >
        {React.Children.map(this.props.children, this.mapChildren)}
        {/* {this.props.children} */}
        {/* <PageTransition
          key='root'
          route='/'
          transition={transition}
        >
          <RootView />
        </PageTransition>
        <PageTransition
          key='child'
          route='/child'
          transition={transition}
        >
          <ChildView />
        </PageTransition> */}
      </Navigator>
    )
  }
}

const RootView = () => (
  <View data-name='root' isPadded style={{background: oc.gray[3], height: '100%', boxSizing: 'border-box'}}>
    <H1>Root</H1>
    <Button primary onClick={e => actions.push('/middle')}>Settings</Button>
  </View>
)

const MiddleView = () => (
  <View data-name='middle' isPadded style={{background: oc.red[2], height: '100%', boxSizing: 'border-box'}}>
    <H1>Middle</H1>
    <Button primary onClick={e => actions.push('/child')}>Settings</Button>
    <Button primary onClick={e => actions.back()}>Back</Button>
  </View>
)

const ChildView = () => (
  <View data-name='child' isPadded style={{background: oc.green[1], height: '100%', boxSizing: 'border-box'}}>
    <H1>Child View</H1>
    <Button primary onClick={e => actions.back()}>Back</Button>
  </View>
)

storiesOf('navigator', module)
  .add('page transition', () => (
    <View flex>
      <AppHeader title='Page fade transition' />
      <NavigationTransition>
        {/* <PageTransition
          key='root'
          route='/'
        >
          <RootView />
        </PageTransition>
        <PageTransition
          key='child'
          route='/child'
        >
          <ChildView />
        </PageTransition> */}
        <RootView route='/' key='root' />
        <MiddleView route='/middle' key='middle' />
        <ChildView route='/child' key='child' />
      </NavigationTransition>
    </View>
  ))
