
import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import createHistory from 'history/createMemoryHistory'
import oc from 'open-color'
import {Signal} from 'raid'
import {Navigator, createActions} from 'raid-navigator'

import {AnimateGroup, Fade, PageIn, H1, Button, View} from '../src'
import {AppHeader} from '../storybook/app'

const signal = Signal.of()
const history = createHistory()
const actions = createActions(history)

class Navigation extends Component {
  componentDidMount () {
    this.dispose = signal.observe(state => {
      this.setState(s => state)
    })
  }

  componentWillUnmount () {
    if (this.dispose) this.dispose()
  }

  state = {
    navigation: []
  }

  render () {
    return (
      <Navigator
        signal={signal}
        navigation={this.state.navigation}
        history={history}
        storage={null}
      >
        {this.props.children}
      </Navigator>
    )
  }
}

const RootView = () => (
  <View isPadded style={{background: oc.gray[1], height: '100%', boxSizing: 'border-box'}}>
    <H1>Root</H1>
    <Button primary onClick={e => actions.push('/child')}>Settings</Button>
  </View>
)

const ChildView = () => (
  <View isPadded style={{background: oc.gray[1], height: '100%', boxSizing: 'border-box'}}>
    <H1>Child View</H1>
    <Button primary onClick={e => actions.back()}>Back</Button>
  </View>
)

storiesOf('navigator', module)
  .add('page transition', () => (
    <View flex>
      <AppHeader title='Page fade transition' />
      <AnimateGroup styles={{width: '100%', height: '100%'}}>
        <Navigation>
          <Fade key='root' route='/'><RootView /></Fade>
          <PageIn key='child' route='/child'><ChildView /></PageIn>
        </Navigation>
      </AnimateGroup>
    </View>
  ))
