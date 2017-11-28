
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import oc from 'open-color'

import {addonApp} from '../storybook/app'
import {View, Button, Block, ButtonGroup, GroupButton, H3} from '../src'

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

const BackedButtonGroup = ButtonGroup.extend`
  background: ${oc.white};
`
const GradientButtonGroup = ButtonGroup.extend`
  background: ${props => props.theme.gradient.blue};
`
const LightButton = GroupButton.extend`
  color: ${oc.white};
`

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
  .add('button group', () => (
    <View>
      <ButtonGroup>
        <GroupButton>A</GroupButton>
        <GroupButton>B</GroupButton>
      </ButtonGroup>
      <Block>
        <H3>Rounded edges</H3>
        <Block tight>
          <BackedButtonGroup isRounded>
            <GroupButton>Option</GroupButton>
            <GroupButton>Another</GroupButton>
          </BackedButtonGroup>
        </Block>
        <Block tight>
          <GradientButtonGroup isRounded>
            <LightButton>Any</LightButton>
            <LightButton>Background</LightButton>
          </GradientButtonGroup>
        </Block>
      </Block>
    </View>
  ))
