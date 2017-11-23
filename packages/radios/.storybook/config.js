
import {configure, addDecorator} from '@storybook/react'

import Base from './base'
import {setGlobalStyling} from '../src'

setGlobalStyling()

addDecorator(story => (
  <Base>{story()}</Base>
))

const req = require.context('../stories', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
