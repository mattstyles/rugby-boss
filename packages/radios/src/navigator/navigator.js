
import {getHistory, createListener} from './history'
import {DEFAULT_KEY, createUpdate} from './update'
import {actions} from './actions'
import RouteMatcher from './routeMatcher'

const {Component} = require(`./env/react/component.js`)

class Navigator extends Component {
  static defaultProps = {
    signal: null,
    history: null,
    root: DEFAULT_KEY,
    navigation: null,
    Component: null,
    ComponentProps: {}
  }

  componentWillMount () {
    const {signal, history, root, storage} = this.props

    this.disposeHistory = getHistory(history).listen(
      createListener(signal)
    )

    this.disposeUpdate = signal.register(createUpdate({
      key: root,
      history,
      signal,
      storage
    }))

    signal.emit({
      type: actions.init
    })
  }

  componentWillUnmount () {
    if (this.disposeHistory) {
      this.disposeHistory()
    }

    if (this.disposeUpdate) {
      this.disposeUpdate()
    }
  }

  render () {
    const {Component, ComponentProps} = this.props
    // @TODO handle Component === null
    return (
      <Component {...ComponentProps}>
        {RouteMatcher(this.props)}
      </Component>
    )
  }
}

export default Navigator
