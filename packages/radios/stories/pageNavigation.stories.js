
import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import createHistory from 'history/createMemoryHistory'
import oc from 'open-color'
import {Signal} from 'raid'
import {compress, safe} from 'raid-addons'

import {Navigator, createActions} from 'raid-navigator'

import {PageTransition, PageGroup, childFactory, TRANSITIONS} from '../src/transitions/page'
import {H1, Block, Button, ButtonGroup, GroupButton, View} from '../src'
import {AppHeader} from '../storybook/app'

const signal = Signal.of()
const history = createHistory()
const actions = createActions(history)

const NavigationGroup = ButtonGroup.extend`
  background: ${oc.white};
`

const events = {
  replace: 'events:replace',
  push: 'events:push',
  pop: 'events:pop',
  setTransition: 'events:setTransition'
}

signal.register(compress({
  [events.setTransition]: safe((state, {transition}) => ({
    ...state,
    transition
  }))
}))

// signal.register(compress({
//   [navigatorEvents.push]: safe((state, event) => ({
//     ...state,
//     // transition: TRANSITIONS.PAGE_IN
//   })),
//   [navigatorEvents.pop]: safe((state, event) => ({
//     ...state,
//     // transition: TRANSITIONS.PAGE_OUT
//   }))
// }))

signal.register(safe((state, event) => {
  console.log(event, '::', state)
}))

class NavigationTransition extends Component {
  state = {
    navigation: []
  }

  componentDidMount () {
    this.dispose = signal.observe(state => {
      this.setState(s => state)
    }, err => console.error(err))
  }

  componentWillUnmount () {
    if (this.dispose) this.dispose()
  }

  mapChildren = child => (
    <PageTransition
      key={child.key}
      route={child.props.route}
    >
      {child}
    </PageTransition>
  )

  render () {
    // console.log('::', this.state)
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
        mapChildren={this.mapChildren}
      >
        {/* {React.Children.map(this.props.children, this.mapChildren)} */}
        {this.props.children}
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

const push = ({route, transition = TRANSITIONS.PAGE_IN}) => event => {
  signal.emit({
    type: events.setTransition,
    payload: {
      transition
    }
  })
  actions.push(route)
}

const back = ({transition = TRANSITIONS.PAGE_OUT}) => event => {
  signal.emit({
    type: events.setTransition,
    payload: {
      transition
    }
  })
  actions.back()
}

const RootView = () => (
  <View data-name='root' isPadded style={{background: oc.gray[3], height: '100%', boxSizing: 'border-box'}}>
    <H1>Root</H1>
    <Block tight>
      <NavigationGroup isRounded>
        <GroupButton onClick={push({
          route: '/middle',
          transition: TRANSITIONS.PAGE_IN
        })}>To Middle</GroupButton>
        <GroupButton onClick={push({
          route: '/fade',
          transition: TRANSITIONS.FADE
        })}>To Fade-in View</GroupButton>
      </NavigationGroup>
    </Block>
  </View>
)

const MiddleView = () => (
  <View data-name='middle' isPadded style={{background: oc.red[2], height: '100%', boxSizing: 'border-box'}}>
    <H1>Middle</H1>
    <Block tight>
      <NavigationGroup isRounded>
        <GroupButton onClick={push({
          route: '/child'
        })}>To Child</GroupButton>
        <GroupButton onClick={back({})}>Back</GroupButton>
      </NavigationGroup>
    </Block>
  </View>
)

const ChildView = () => (
  <View data-name='child' isPadded style={{background: oc.green[1], height: '100%', boxSizing: 'border-box'}}>
    <H1>Child View</H1>
    <Button primary onClick={back({})}>Back</Button>
  </View>
)

const FadeView = () => (
  <View data-name='fader' isPadded style={{background: oc.blue[1], height: '100%', boxSizing: 'border-box'}}>
    <H1>Fade Transition View</H1>
    <Button primary onClick={back({
      transition: TRANSITIONS.FADE
    })}>Back</Button>
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
        <FadeView route='/fade' key='fade' />
      </NavigationTransition>
    </View>
  ))
