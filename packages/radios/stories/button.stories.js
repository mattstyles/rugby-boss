
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import {addonApp} from '../storybook/app'
import {View, Button, Block} from '../src'

const TypedButton = ({type}) => {
  return (
    <Block tight>
      <Button
        {...{[type]: true}}
        fit
        onClick={action(type)}
      >
        {type.replace(/^./, _ => _.toUpperCase())}
      </Button>
    </Block>
  )
}

storiesOf('button', module)
  .addDecorator(addonApp())
  .add('buttons', () => (
    <View isPadded flex>
      <TypedButton type='base' />
      <TypedButton type='primary' />
      <TypedButton type='error' />
      <TypedButton type='transparent' />
      <Block tight>
        <Button
          fit
          shouty
          primary
          onClick={action('uppercase')}>
          Uppercase
        </Button>
      </Block>
    </View>
  ))
