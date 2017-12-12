
import {compose} from 'lodash/fp'

import {getProps, wrapChildren} from './utils'
import {DEFAULT_KEY} from './update'

const {matchRoute} = require(`./env/react/routes.js`)

const RouteMatcher = props => {
  const {children, navigation} = getProps({
    ...props,
    root: DEFAULT_KEY
  })

  if (!navigation) {
    return null
  }

  const {stack, index} = navigation

  if (!stack || !stack.length) {
    return null
  }

  return compose(
    wrapChildren,
    matchRoute(stack[index])
  )(children)
  // const {Wrapper} = props
  // return (
  //   <Wrapper styles={{width: '100%', height: '100%'}}>
  //     {compose(
  //       wrapChildren,
  //       matchRoute(stack[index])
  //     )(children)}
  //   </Wrapper>
  // )
}

export default RouteMatcher
